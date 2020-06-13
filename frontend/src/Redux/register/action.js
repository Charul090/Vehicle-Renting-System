import {Send_Query,Query_Successfull,Query_Failure,Clear_Register} from "./actiontypes.js"
import axios from "axios"


const Clear_Register_State=()=>{
    return {
        type:Clear_Register
    }
}

const Query_Sent=()=>{
    return {
        type:Send_Query
    }
}

const Register_Successfull=(data)=>{
    return{
        type:Query_Successfull,
        payload:data
    }
}

const Register_Failure=(data)=>{
    return {
        type:Query_Failure,
        payload:data
    }
}


const Register_Query=(info)=>{
    return dispatch=>{
        dispatch(Query_Sent)
        return axios({
            method:"post",
            url:"http://127.0.0.1:5000/register",
            data:info,
            headers:{
                "Content-type": "application/json; charset=utf-8"
            }
        })
        .then((res)=>res.data)
        .then((data)=>{
            if(data.error){
                dispatch(Register_Failure(data.message))
            }
            else{
                dispatch(Register_Successfull(data.message))
            }
        })
        .catch((err)=>console.log(err))
    }
}

export {Register_Query,Clear_Register_State}