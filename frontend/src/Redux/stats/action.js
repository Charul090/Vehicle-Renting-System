import {SEND_STATS_QUERY,STATS_QUERY_SUCCESSFULL,STATS_QUERY_FAILURE} from "./actiontypes.js"
import axios from "axios"

const Stats_Query=()=>{
    return {
        type:SEND_STATS_QUERY
    }
}


const Stats_Success=(data)=>{
    return {
        type:STATS_QUERY_SUCCESSFULL,
        payload:data
    }
}


const Stats_Fail=()=>{
    return{
        type:STATS_QUERY_FAILURE
    }
}

const Start_Stats_Query=()=>{
    return dispatch=>{
        dispatch(Stats_Query())
        return axios({
            method:"get",
            url:"http://127.0.0.1:5000/dashboard",
        })
        .then((res)=>res.data)
        .then((data)=>{
            dispatch(Stats_Success(data))
        })
        .catch((err)=>{
            console.log(err)
            dispatch(Stats_Fail())
        })
    }
}

export {Start_Stats_Query}