import {Ride_Query,Ride_Query_Successfull,Ride_Query_Failure,Change_Page,SEND_TRANSACTION_QUERY,TRANSACTION_QUERY_SUCCESSFULL,TRANSACTION_QUERY_FAILURE} from "./actiontypes.js"
import axios from "axios"

const Send_Query=()=>{
    return {
        type:Ride_Query
    }
}

const Change_Current_Page=(page)=>{
    return {
        type:Change_Page,
        payload:page
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

const Transaction_Query=()=>{
    return {
        type:SEND_TRANSACTION_QUERY
    }
}


const Transaction_Success=(data)=>{
    return {
        type:TRANSACTION_QUERY_SUCCESSFULL,
        payload:data
    }
}


const Transaction_Fail=()=>{
    return{
        type:TRANSACTION_QUERY_FAILURE
    }
}


const PrevRides_Info_Query=(user_id,page=1,perpage=10)=>{
    return dispatch=>{
        dispatch(Send_Query())
        return axios({
            method:"get",
            url:"http://127.0.0.1:5000/user/prevride",
            params:{
                user_id:user_id,
                page:page,
                per_page:perpage
            }
        })
        .then((res)=>res.data)
        .then((data)=>{
            dispatch(Query_Success(data))
            dispatch(Change_Current_Page(data.current_page))
        })
        .catch((err)=>{
            console.log(err)
            dispatch(Query_Fail())
        })
    }
}

const Start_Transaction_Query=(user_id,page=1,perpage=10)=>{
    return dispatch=>{
        dispatch(Transaction_Query())
        return axios({
            method:"get",
            url:"http://127.0.0.1:5000/alltransactions",
            params:{
                user_id:user_id,
                page:page,
                per_page:perpage
            }
        })
        .then((res)=>res.data)
        .then((data)=>{
            dispatch(Transaction_Success(data))
            dispatch(Change_Current_Page(data.current_page))
        })
        .catch((err)=>{
            console.log(err)
            dispatch(Transaction_Fail())
        })
    }
}


export {PrevRides_Info_Query,Change_Current_Page,Start_Transaction_Query}