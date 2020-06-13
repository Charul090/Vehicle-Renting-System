import {USER_Logout,USER_Query,USER_Query_Successfull,USER_QUERY_Fail,Login_Query,Login_Successfull,Login_Failure} from "./actiontypes.js"
import axios from "axios"



const Logout=()=>{
    return {
        type:USER_Logout
    }
}

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

const Send_User_Query=()=>{
    return {
        type:USER_Query
    }
}

const User_Query_Success=(data)=>{
    return {
        type:USER_Query_Successfull,
        payload:data
    }
}

const User_Query_Failure=()=>{
    return {
        type:USER_QUERY_Fail
    }
}


const User_Query=(info)=>{
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
                let obj={
                    token:data.token
                }
                dispatch(User_Info_Query(obj))
            }
        })
        .catch((err)=>console.log(err))
    }
}

const Admin_Query=(info)=>{
    return dispatch=>{
        dispatch(Send_Query())
        return axios({
            method:"post",
            url:"http://127.0.0.1:5000/adminlogin",
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
                let obj={
                    token:data.token
                }
                dispatch(User_Info_Query(obj))
            }
        })
        .catch((err)=>console.log(err))
    }
}


const User_Info_Query=(info)=>{
    return dispatch=>{
        dispatch(Send_User_Query())
        return axios({
            method:"post",
            url:"http://127.0.0.1:5000/auth_check",
            data:info,
            headers:{
                "Content-type": "application/json; charset=utf-8"
            }
        }).then((res)=>res.data)
        .then((data)=>{
            if(data.error){
                dispatch(User_Query_Failure())
            }
            else{
                dispatch(User_Query_Success(data))
            }
        })
    }
}

export {User_Query,Admin_Query,Logout}