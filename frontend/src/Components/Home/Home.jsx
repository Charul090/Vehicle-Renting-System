import React,{useState,useEffect} from 'react'
import {useSelector,useDispatch} from "react-redux"
import {Link,useHistory} from "react-router-dom"
import {Car_Query} from "../../Redux/car_home/action.js"
import {Location_Query} from "../../Redux/location/action.js"

export default function Home() {

    let history = useHistory()
    let dispatch = useDispatch()

    let {logged_in}=useSelector(state=>state.user)

    useEffect(()=>{
        if(logged_in){
            dispatch(Car_Query())
            dispatch(Location_Query())
        }
        else{
            history.push("/userlogin")
        }
    },[])

    return (
        <div>
            <h1>Home</h1>
            <Link to="/userlogin">Login</Link>
        </div>
    )
}
