import {Send_Transaction_Query,Transaction_Query_Successfull,Transaction_Query_Failure} from "./actiontypes.js"
import axios from "axios"


const Send_Query=()=>{
    return {
        type:Send_Transaction_Query
    }
}

const Query_Success=(data)=>{
    return {
        type:Transaction_Query_Successfull,
        payload:data
    }
}


const Query_Fail=()=>{
    return{
        type:Transaction_Query_Failure
    }
}


const Transaction_Query=(id)=>{
    return dispatch=>{
        dispatch(Send_Query())
        return axios({
            method:"get",
            url:`http://127.0.0.1:5000/user/transaction/${id}`
        })
        .then((res)=>res.data)
        .then((data)=>{
            dispatch(Query_Success(data))
        })
        .catch((err)=>{
            dispatch(Query_Fail())
            console.log(err)
        })
    }
}

export {Transaction_Query}