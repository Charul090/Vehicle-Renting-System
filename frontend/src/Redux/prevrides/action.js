import {Ride_Query,Ride_Query_Successfull,Ride_Query_Failure} from "./actiontypes.js"
import axios from "axios"
import { Query_Successfull, Query_Failure } from "../register/actiontypes.js"

const Send_Query=()=>{
    return {
        type:Ride_Query
    }
}

const Query_Success=(data)=>{
    return{
        type:Ride_Query_Successfull,
        payload:data
    }
}


const Query_Fail=()=>{
    return {
        type:Ride_Query_Failure
    }
}


const PrevRides_Info_Query=(user_id)=>{
    return dispatch=>{
        dispatch(Send_Query())
        return axios({
            method:"get",
            url:"http://127.0.0.1:5000/user/prevride",
            params:{
                user_id:user_id
            }
        })
        .then((res)=>res.data)
        .then((data)=>{
            dispatch(Query_Success(data))
        })
        .catch((err)=>{
            console.log(err)
            dispatch(Query_Fail())
        })
    }
}


export {PrevRides_Info_Query}