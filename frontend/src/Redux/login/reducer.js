import { USER_Logout, USER_Query, USER_Query_Successfull, USER_QUERY_Fail, Login_Query, Login_Successfull, Login_Failure } from "./actiontypes.js"


const initialState = {
    request: false,
    message: "",
    logged_in: false,
    token: "",
    admin: false,
    user_info: {}
}

export default (state = initialState, { type, payload }) => {
    switch (type) {


        case USER_Logout:
            return {
                ...state,
                request: false,
                message: "",
                logged_in: false,
                token: "",
                admin: false,
                user_info: {}
            }

        case Login_Query:
            return {
                ...state,
                request: true,
                admin: false
            }

        case USER_Query:
            return {
                ...state
            }

        case USER_Query_Successfull:
            return {
                ...state,
                user_info: payload.data
            }

        case USER_QUERY_Fail:
            return {
                ...state,
                request: false,
                message: "",
                logged_in: false,
                token: "",
                admin: false,
                user_info: {}
            }

        case Login_Successfull:
            return {
                ...state,
                message: payload.message,
                logged_in: true,
                token: payload.token,
                admin: payload.admin
            }

        case Login_Failure:
            return {
                ...state,
                message: payload.message,
                logged_in: false,
                token: "",
                admin: false
            }

        default:
            return {
                ...state
            }
    }
}

