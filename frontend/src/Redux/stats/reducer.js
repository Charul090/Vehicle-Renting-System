import {SEND_STATS_QUERY,STATS_QUERY_SUCCESSFULL,STATS_QUERY_FAILURE,SEND_TRANSACTION_QUERY,TRANSACTION_QUERY_SUCCESSFULL,TRANSACTION_QUERY_FAILURE} from "./actiontypes.js"


const initialState = {
    most_distance:{},
    stat:{},
    graph:{},
    users_count:null,
    transaction:{}
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case SEND_STATS_QUERY:
        return { ...state}
    
    case STATS_QUERY_SUCCESSFULL:
        return {
            ...state,
            most_distance:payload.most_distance,
            stat:payload.stat,
            graph:payload.graph,
            users_count:payload.users_count
        }
    
    case STATS_QUERY_FAILURE:
        return{
            ...initialState
        }

    default:
        return state
    }
}
