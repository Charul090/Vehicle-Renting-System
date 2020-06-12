import {Ride_Query,Ride_Successfull,Ride_Failure} from "./actiontypes.js"
import axios from "axios"


const Ride_Start=()=>{
    return {
        type:Ride_Query
    }
}

const Successfull_Ride=(data)=>{
    return{
        type:Ride_Successfull,
        payload:data
    }
}


const Failed_Ride=()=>{
    return {
        type:Ride_Failure
    }
}


const Send_Ride_Query=(info)=>{
    return dispatch=>{
        dispatch(Ride_Start())
        return axios({
            method:"post",
            url:"http://127.0.0.1:5000/user/updateride",
            data:info,
            headers:{
                "Content-type": "application/json; charset=utf-8"
            }
        })
        .then((res)=>res.data)
        .then((data)=>{
            dispatch(Successfull_Ride(data))
        })
        .catch((err)=>{
            console.log(err)
            dispatch(Failed_Ride())
        })
    }
}


export {Send_Ride_Query}