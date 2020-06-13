import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { Redirect } from "react-router-dom"
import { Container, Col, Row, Table } from 'react-bootstrap'
import { PrevRides_Info_Query } from "../../Redux/prevrides/action.js"

export default function PrevRide() {

    let { user_info, logged_in } = useSelector(state => state.user)
    let dispatch = useDispatch()

    useEffect(() => {
        if (logged_in) {
            dispatch(PrevRides_Info_Query(user_info.user_id))
        }
    }, [])

    let info = useSelector(state => state.user_prev_ride.data)

    console.log(info)


    if (!logged_in) {
        return (
            <Redirect to="/userlogin"></Redirect>
        )
    }

    return (
        <Container fluid="md">
            <Row className="mt-5">
                <Col>
                    <h3 className="text-center">Previous Rides</h3>
                    <Table striped bordered hover responsive="md">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Car</th>
                                <th>Starting Point</th>
                                <th>Destination</th>
                                <th>Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {info.data === undefined ? null : info.data.map((elem, index) => {
                                return (
                                    <tr key={`${index}-x`}>
                                        <td>{index + 1}</td>
                                        <td>{elem.car_make} {elem.car_model}</td>
                                        <td>{elem.start}</td>
                                        <td>{elem.destination}</td>
                                        <td>{elem.time}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    )
}
