import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { Container, Col, Row, Table, Form } from 'react-bootstrap'
import {Start_Transaction_Query} from "../../Redux/prevrides/action.js"
import {Link} from "react-router-dom"
import Pages from "../Pages/Pages.jsx"

export default function DashboardTransaction() {
    let { user_info } = useSelector(state => state.user)
    let dispatch = useDispatch()

    const [perpage, SetPerpage] = useState(10)

    let info = useSelector(state => state.user_prev_ride.data)
    let { total_pages } = useSelector(state => state.user_prev_ride.data)
    let { current_page } = useSelector(state => state.user_prev_ride)

    useEffect(() => {
            dispatch(Start_Transaction_Query(user_info.user_id,current_page,perpage))
    }, [])


    useEffect(() => {
        dispatch(Start_Transaction_Query(user_info.user_id,current_page,perpage))
    }, [current_page,perpage])


    const handleChange = (e) => {
        let val = e.target.value

        SetPerpage(val)
    }

    

    return (
        <Container fluid>
            <Row className="mt-5">
                <Col>
                    <h3 className="text-center">All Rides</h3>
                    <Row className="mt-1">
                        <Col sm={{ span: 4, offset: 8 }} lg={{ span: 2, offset: 10 }}>
                            <Form.Group>
                                <Form.Control as="select" value={perpage} onChange={handleChange}>
                                    <option value={5}>5</option>
                                    <option value={10}>10</option>
                                    <option value={15}>15</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Table striped bordered hover responsive="md">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Transaction ID</th>
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
                                        <td>{((current_page-1)*perpage)+index+1}</td>
                                        <td><Link to={`/user/transaction/${elem.transaction_id}`}>1{elem.transaction_id}</Link></td>
                                        <td>{elem.car_make} {elem.car_model}</td>
                                        <td>{elem.start}</td>
                                        <td>{elem.destination}</td>
                                        <td>{elem.time}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                    {total_pages > 1 ? <Pages total_pages={total_pages} page={current_page} perpage={perpage} user_id={user_info.user_id} />
                        : null}
                </Col>
            </Row>
        </Container>
    )
}
