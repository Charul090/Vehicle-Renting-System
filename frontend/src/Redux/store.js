import regisReducer from "./register/reducer.js"
import {combineReducers,applyMiddleware,createStore,compose} from "redux"
import thunk from "redux-thunk"
import loginReducer from "./login/reducer.js"


const reducers=combineReducers({regis:regisReducer,user:loginReducer})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store=createStore(reducers,composeEnhancers(applyMiddleware(thunk)))


export {store}