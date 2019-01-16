import { STORE_USER_FOCUS,
         USER_SEARCH,
         } from "../ReduxActions/FocusActions"

import { DISTRACTION_COUNT } from "../ReduxActions/VisualizationActions"

import { combineReducers } from "redux"

import CountFocuses from "./Helpers/CountFocuses"
import GetFocusList from "./Helpers/GetFocusList"
import CountDistractions from './Helpers/CountDistractions'

const focusHandler = (state = {focus: {}}, action) => {
    console.log("focus state ", state)
    switch (action.type) {
        case STORE_USER_FOCUS:
            let focus = GetFocusList(action.focus);
            let counts = CountFocuses(focus);
            return Object.assign( {}, state, {
                focus: focus,
                counts: counts,
                options: action.options,
                user: action.user
            })
        case USER_SEARCH:
            return Object.assign( {}, state, {
                isSearching: action.isSearching
            })
        default: 
            return Object.assign({}, state, {
                focus: [], 
                counts: {
                    complete: 0, 
                    incomplete: 0
                },
                isSearching: false,
                isError: false,
            })
    }
}

const visualizationHandler = (state = {counts: {}}, action) =>{
    console.log('vis hander',state);
    switch (action.type){
        case DISTRACTION_COUNT:
            let counts = CountDistractions(action.focuses)
            return Object.assign({}, state, {
                counts: counts
            })
        default:
            return Object.assign({}, state, {
                counts: {}
            })
    }
}

const rootReducer = combineReducers({
    focusHandler, 
    visualizationHandler
})  

export default rootReducer