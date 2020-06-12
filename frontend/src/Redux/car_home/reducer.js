import {Send_Query_Car,Query_Successfull_Car,Query_Failure_Car} from "./actiontypes.js"

const initialState = {
    data: []
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

        case Send_Query_Car:
            return {
                ...state
            }
        
        case Query_Successfull_Car:
            return {
                ...state,
                data:payload.data
            }

        case Query_Failure_Car:
            return {
                ...state
            }
        default:
            return {
                ...state
            }
    }
}
