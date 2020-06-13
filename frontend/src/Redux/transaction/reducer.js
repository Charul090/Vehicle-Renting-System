import {Send_Transaction_Query,Transaction_Query_Successfull,Transaction_Query_Failure} from "./actiontypes.js"

const initialState = {
    info:{}
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case Send_Transaction_Query:
        return { ...state }

    case Transaction_Query_Successfull:
        return {
            ...state,
            info:payload.data[0]
        }

    case Transaction_Query_Failure:
        return {
            ...state
        }

    default:
        return {...state}
    }
}
