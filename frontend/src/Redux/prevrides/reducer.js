import {Ride_Query,Ride_Query_Successfull,Ride_Query_Failure,Change_Page,SEND_TRANSACTION_QUERY,TRANSACTION_QUERY_SUCCESSFULL,TRANSACTION_QUERY_FAILURE} from "./actiontypes.js"


const initialState = {
    data:{},
    current_page:1
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case Change_Page:
        return {
            ...state,
            current_page:payload
        }

    case Ride_Query:
        return { ...state }

    case Ride_Query_Successfull:
        return {
            ...state,
            data:payload
        }

    case Ride_Query_Failure:{
        return {
            ...state,
            data:{}
        }
    }

    case SEND_TRANSACTION_QUERY:
        return { ...state}
        
    case TRANSACTION_QUERY_SUCCESSFULL:
        return {
            ...state,
            data:payload
        }
        
    case TRANSACTION_QUERY_FAILURE:
        return{
            ...state,
            data:{}
        }

    default:
        return {...state}
    }
}
