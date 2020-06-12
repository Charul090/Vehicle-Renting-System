import {Login_Query,Login_Successfull,Login_Failure} from "./actiontypes.js"


const initialState = {
    request:false,
    message:"",
    logged_in:false,
    token:"",
    admin:false
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case Login_Query:
        return {
            ...state,
            request:true,
            admin:false
        }

    case Login_Successfull:
        return {
            ...state,
            message:payload.message,
            logged_in:true,
            token:payload.token,
            admin:payload.admin
        }
    
    case Login_Failure:
        return {
            ...state,
            message:payload.message,
            logged_in:false,
            token:"",
            admin:false
        }

    default:
        return {
            ...state
        }
    }
}

