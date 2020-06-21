import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useSelector } from "react-redux"
import { Redirect } from 'react-router-dom'
import SideBar from '../SideBar/SideBar'
import styles from "./DashBoard.module.css"
import DashBoardRoutes from '../../Routes/DashBoardRoutes'
import DashBoardHeader from '../DashBoardHeader/DashBoardHeader'
import {useMediaQuery} from "react-responsive"

export default function Dashboard() {

    let { admin, logged_in } = useSelector(state => state.user)

    const deviceWidth = useMediaQuery({ query: '(max-width: 768px)' })

    if (logged_in && admin) {
        return (
            <Container className={`${!deviceWidth?"h-100":null} background-dashboard`} fluid>
                <Row className="h-100">
                    {
                        deviceWidth?null:
                        <Col md={3} className="p-0 h-100">
                        <SideBar />
                    </Col>
                    }
                    <Col xs={12} md={9} className="p-0">
                        <DashBoardHeader />
                        <DashBoardRoutes />
                    </Col>
                </Row>
            </Container>
        )
    }
    else {
        return (
            <Redirect to="/userlogin" />
        )
    }

}
