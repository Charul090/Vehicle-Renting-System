import regisReducer from "./register/reducer.js"
import {combineReducers,applyMiddleware,createStore,compose} from "redux"
import thunk from "redux-thunk"
import loginReducer from "./login/reducer.js"
import carhomeReducer from "./car_home/reducer.js"
import locationReducer from "./location/reducer.js"
import rideReducer from "./ride/reducer.js"

const reducers = combineReducers({regis:regisReducer,user:loginReducer,carhome:carhomeReducer,location:locationReducer,ride:rideReducer})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store=createStore(reducers,composeEnhancers(applyMiddleware(thunk)))


export {store}