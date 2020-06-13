import { Clear,Ride_Query, Ride_Successfull, Ride_Failure } from "./actiontypes.js"

const initialState = {
    status: false,
    message: "",
    info:{}
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

        case Ride_Query:
            return { ...state }

        case Ride_Successfull:
            return {
                ...state,
                status:payload.status,
                message:payload.message,
                info:payload.info
            }
        
        case Ride_Failure:
            return {
                ...state,
                status:false,
                message:""
            }
        case Clear:
            return {
                ...state,
                status:false,
                message:"",
                info:{}
            }
        default:
            return {...state}
    }
}
