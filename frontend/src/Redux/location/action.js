import {Start_Location_Query,Location_Query_Successfull,Location_Query_Failure} from "./actiontypes.js"
import axios from "axios"


const Start_Query=()=>{
    return {
        type:Start_Location_Query
    }
}

const Query_Successfull=(payload)=>{
    return {
        type:Location_Query_Successfull,
        payload:payload.data
    }
}

const Query_Failure=()=>{
    return {
        type:Location_Query_Failure
    }
}


const Location_Query=()=>{
    return dispatch=>{
        dispatch(Start_Query())
        return axios({
            method:"get",
            url:"http://127.0.0.1:5000/location"
        })
        .then((res)=>res.data)
        .then((data)=>{
            dispatch(Query_Successfull(data))
        })
        .catch((err)=>{
            console.log(err)
            dispatch(Query_Failure())
        }
        )
    }
}


export {Location_Query}