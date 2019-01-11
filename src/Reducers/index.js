import { STORE_FOCUS,
         STORE_USER_FOCUS } from "../ReduxActions/FocusActions"

import { combineReducers } from "redux"

const getFocusList = (actionFocus) =>{
    if(actionFocus === undefined){
        //if no action focuses yet
        return [];
    }
    let focus = [];
    let focuses = { ...actionFocus};
    let keys = Object.keys(focuses);
    for(let i = 0; i< keys.length; i++){
        focus.push(focuses[keys[i]])
    }
    return focus
}

const focusHandler = (state = {focus: {}}, action) => {
    switch (action.type){
        case STORE_USER_FOCUS:
            let focus = getFocusList(action.focus);
            return Object.assign({}, state,{
                focus: focus
            })
        default: 
            return Object.assign({}, state,{
                focus: []
            })
    }
}
const rootReducer = combineReducers({
    focusHandler
})  

export default rootReducer