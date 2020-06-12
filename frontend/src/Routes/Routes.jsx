import React from 'react'
import {Switch,Route} from "react-router-dom"
import Register from "../Components/Register/Register.jsx"
import Home from '../Components/Home/Home.jsx'
import Login from '../Components/Login/Login.jsx'

export default function Routes() {
    return (
        <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/register" component={Register} />
            <Route path="/userlogin" component={Login} />
        </Switch>
    )
}
