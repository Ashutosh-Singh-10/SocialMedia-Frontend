import { combineReducers } from "redux";
import uriReducer from "./uriReducer"
import  accessReducer from "./accessReducer"

const reducers=combineReducers ({
    uri:uriReducer,
    accessToken:accessReducer,

})

export default reducers;