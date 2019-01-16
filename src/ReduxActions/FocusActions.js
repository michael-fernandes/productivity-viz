export const STORE_FOCUS = "FOCUS_DONE"
export const HIDE_FOCUS = "FOCUS_HIDE"
export const STORE_USER_FOCUS = "STORE_USER_FOCUS"
export const USER_SEARCH = "USER_SEARCH"

const storeUserFocus = (userData) => {
  return {
      type: STORE_USER_FOCUS,
      focus: userData.focus,
      options: userData.options,
      user: userData.username
  }
}

const userSearch = (searching, error = false) =>{
  return {
    type: USER_SEARCH,
    isSearching: searching,
    isError: error
  }
}

export const userCheck = (username, initial) => {
  console.log("getting intial focus set")
  return (dispatch) => {
    let url = "/userCheck/" + username
    if(initial) {
      dispatch(userSearch(true))
    }
    fetch(url, {
        method: 'GET',
        headers: {'Content-Type':'application/json','Access-Control-Allow-Origin': '*',},
      }).then( res => {
        if (!res.ok) {
          dispatch(userSearch(false, true));
          throw Error(res.statusText);
        }
        return res.json()
      }).then( (json) => {
          let data = json;
          if(data.data.length){
            dispatch( userSearch(false))
            dispatch( storeUserFocus( data.data[0].user ))
          }
        },(error) => {
          console.log(error)
      }) 
  }
}

export const storeFocusHelper = (focus, userName) => {
    console.log("focus Store")
    return (dispatch) => {
      let url = "/saveFocus/" + userName
      fetch(url, {
          method: 'POST',
          headers: {'Content-Type':'application/json','Access-Control-Allow-Origin': '*',},
          body: JSON.stringify(focus)
        }).then( res => {
          if (!res.ok) {
            throw Error(res.statusText);
          }
          console.log('store response,', res);
          dispatch(userCheck(userName));
          return res
        })
    }
}

export const hideFocus = (userName, key) => {
    console.log(userName )
    let url = "/hideFocus/" + userName + "/" + key;
    return (dispatch) =>{
        fetch(url, {
            method: 'GET',
            headers: {'Content-Type':'application/json','Access-Control-Allow-Origin': '*',},
          }).then( res => {
            if (!res.ok) {
              throw Error(res.statusText);
            }
            console.log("hidden");
            dispatch(userCheck(userName, false))
            return res
          })
    }
}

export const updateDistraction = (userName, key, distraction) => {
  console.log("update distraction" )
  let url = "/updateDistraction/" + userName + "/" + key + "/" + distraction;
  return (dispatch) => {
      fetch(url, {
          method: 'GET',
          headers: {'Content-Type':'application/json','Access-Control-Allow-Origin': '*',},
        }).then( res => {
          if (!res.ok) {
            throw Error(res.statusText);
          }
          console.log("distraction changed");
          dispatch(userCheck(userName))
          return res
        })
  }
}

export const createNewOption = (userName, option) => {
  console.log("add option" )
  let url = "/updateDistraction/" + userName + "/" + option;
  return (dispatch) => {
      fetch(url, {
          method: 'GET',
          headers: {'Content-Type':'application/json','Access-Control-Allow-Origin': '*',},
        }).then( res => {
          if (!res.ok) {
            throw Error(res.statusText);
          }
          console.log("option updated");
          dispatch(userCheck(userName))
          return res
        })
  }
}