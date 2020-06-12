import { Ride_Query, Ride_Successfull, Ride_Failure } from "./actiontypes.js"

const initialState = {
    status: false,
    message: ""
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

        case Ride_Query:
            return { ...state }

        case Ride_Successfull:
            return {
                ...state,
                status:payload.status,
                message:payload.message
            }
        
        case Ride_Failure:
            return {
                ...state,
                status:false,
                message:""
            }
        default:
            return {...state}
    }
}
