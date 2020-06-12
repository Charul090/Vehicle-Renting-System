import {Send_Query_Car,Query_Successfull_Car,Query_Failure_Car} from "./actiontypes.js"
import axios from "axios"



const Send_Car_Query=()=>{
    return {
        type:Send_Query_Car
    }
}


const Car_Query_Successfull=(data)=>{
    return{
        type:Query_Successfull_Car,
        payload:data
    }
}

const Car_Query_Failure=()=>{
    return {
        type:Query_Failure_Car
    }
}

const Car_Query=()=>{
    return dispatch=>{
        dispatch(Send_Car_Query())
        return axios({
            method:"get",
            url:"http://127.0.0.1:5000/car/basic"
        })
        .then((res)=>res.data)
        .then((data)=>{
            dispatch(Car_Query_Successfull(data))
        })
        .catch((err)=>{
            console.log(err)
            dispatch(Car_Query_Failure())
        }
        )
    }
}

export {Car_Query}