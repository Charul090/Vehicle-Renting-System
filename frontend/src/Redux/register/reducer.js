import {Send_Query,Query_Successfull,Query_Failure} from "./actiontypes.js"


const initialState = {
    message:"",
    error:false
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

        case Send_Query:
            return {
                ...state,
                message:"",
                error:false
            }
        
        case Query_Successfull:
            return {
                ...state,
                message:payload,
                error:false
            }
        
        case Query_Failure:
            return {
                ...state,
                message:payload,
                error:true
            }

        default:
            return {
                ...initialState
            }
    }
}
