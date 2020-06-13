import React from 'react'
import {Switch,Route} from "react-router-dom"
import Register from "../Components/Register/Register.jsx"
import Home from '../Components/Home/Home.jsx'
import UserLogin from '../Components/UserLogin/UserLogin.jsx'
import AdminLogin from '../Components/AdminLogin/AdminLogin.jsx'
import Confirmation from '../Components/Confirmation/Confirmation.jsx'

export default function Routes() {
    return (
        <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/register" component={Register} />
            <Route path="/userlogin" component={UserLogin} />
            <Route path="/adminlogin" component={AdminLogin} />
            <Route path="/confirmation" component={Confirmation} />
        </Switch>
    )
}
