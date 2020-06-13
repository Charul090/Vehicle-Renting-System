import {Ride_Query,Ride_Query_Successfull,Ride_Query_Failure} from "./actiontypes.js"


const initialState = {
    data:{}
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

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

    default:
        return {...state}
    }
}
