import {Start_Location_Query,Location_Query_Successfull,Location_Query_Failure} from "./actiontypes.js"

const initialState = {
    data:[]
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case Start_Location_Query:
        return {
            ...state
        }

    case Location_Query_Successfull:
        return {
            ...state,
            data:[...payload]
        }

    case Location_Query_Failure:
        return {
            ...state
        }

    default:
        return {
            ...state
        }
    }
}
