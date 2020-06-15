import React from 'react'
import { Container } from 'react-bootstrap'
import StatsPage from '../StatsPage/StatsPage'
import {useSelector} from "react-redux"
import { Redirect } from 'react-router-dom'

export default function Dashboard() {

    let {admin,logged_in}=useSelector(state=>state.user)


    if(logged_in && admin){
        return (
            <Container>
                <StatsPage />
            </Container>
        )
    }
    else{
        return (
            <Redirect to="/userlogin" />
        )
    }

}
