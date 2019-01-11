export const STORE_FOCUS = "FOCUS_DONE"
export const HIDE_FOCUS = "FOCUS_HIDE"
export const STORE_USER_FOCUS = "STORE_USER_FOCUS"


export const storeFocusHelper = (focus, userName) => {
    console.log(focus);
    return (dispatch) => {
        let url = "/saveFocus/" + 'username'
    fetch(url, {
        method: 'POST',
        headers: {'Content-Type':'application/json','Access-Control-Allow-Origin': '*',},
        body: JSON.stringify(focus)
      }).then( res => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        return res
      })
      .then( (json) => {
          console.log("stored");
          dispatch(userCheck(userName));
        },(error) => {
          console.log(error)
      }) 

    }
}

export const hideFocus = (userName, key) => {
    console.log("action dispatched")
    let url = "/hideFocus/" + userName + "/" + key;
    return (dispatch) =>{
        fetch(url, {
            method: 'GET',
            headers: {'Content-Type':'application/json','Access-Control-Allow-Origin': '*',},
          }).then( res => {
            if (!res.ok) {
              throw Error(res.statusText);
            }
            console.log("stored");
            let d = userCheck(userName);
            dispatch(d)
            return res
          })
    }
}

const storeUserFocus = (userData) => {
    return {
        type: STORE_USER_FOCUS,
        focus: userData.focus
    }
}

export const userCheck = (username) => {
    console.log("getting intial focus set")
    return (dispatch) => {
    let url = "/userCheck/" + username
    fetch(url, {
        method: 'GET',
        headers: {'Content-Type':'application/json','Access-Control-Allow-Origin': '*',},
      }).then( res => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        return res.json()
      }).then( (json) => {
          let data = json;
          console.log(data);
          if(data.data.length){
            dispatch( storeUserFocus( data.data[0].user ))
          }
        //   let userData = json.data[0].user
        //   dispatch( storeUserFocus( userData ))
        },(error) => {
          console.log(error)
      }) 
    }
}