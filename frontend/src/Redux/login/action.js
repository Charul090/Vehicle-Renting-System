import {Login_Query,Login_Successfull,Login_Failure} from "./actiontypes.js"
import axios from "axios"

const Send_Query=()=>{
    return {
        type:Login_Query
    }
}

const Successfull_Login=(data)=>{
    return {
        type:Login_Successfull,
        payload:data
    }
}

const Failure_Login=(data)=>{
    return {
        type:Login_Failure,
        payload:data
    }
}


const Query=(info)=>{
    return dispatch=>{
        dispatch(Send_Query())
        return axios({
            method:"post",
            url:"http://127.0.0.1:5000/userlogin",
            data:info,
            headers:{
                "Content-type": "application/json; charset=utf-8"
            }
        })
        .then((res)=>res.data)
        .then((data)=>{
            if(data.error){
                dispatch(Failure_Login(data))
            }
            else{
                dispatch(Successfull_Login(data))
            }
        })
        .catch((err)=>console.log(err))
    }
}

export {Query}