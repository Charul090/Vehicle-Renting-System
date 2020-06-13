import React,{useEffect} from 'react'
import { Container, Card ,Row,Col, ListGroup} from 'react-bootstrap'
import { useParams, Redirect } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import {Transaction_Query} from "../../Redux/transaction/action.js"
import "./Transaction.css"

export default function Transaction() {

    let params = useParams()

    let dispatch = useDispatch()

    let { logged_in } = useSelector(state => state.user)

    let {info} = useSelector(state=>state.transaction)

    useEffect(()=>{
        if(logged_in){
            dispatch(Transaction_Query(Number(params.id)))
        }

    },[])

    if (!logged_in) {
        return (
            <Redirect to="/userlogin"></Redirect>
        )
    }
    else {
        return (
            <Container>
                <Row className="justify-content-center mt-4 mb-4">
                    <Col md={{span:8}}>
                        <Card className="shadow-sm">
                            <Card.Header>
                                <h5 className="text-center">Transaction Details</h5>
                            </Card.Header>
                            <Card.Body>
                                <ListGroup variant="flush" className="list-group">
                                    <ListGroup.Item><h6><b>Transaction ID</b> : {info["transaction_id"]}</h6></ListGroup.Item>
                                    <ListGroup.Item><h6><b>Ride Distance</b> : {info["distance"]} km</h6></ListGroup.Item>
                                    <ListGroup.Item><h6><b>Cost for Ride</b> : ₹{info["cost"]}</h6></ListGroup.Item>
                                    <ListGroup.Item><h6><b>Time</b> : {info["time"]}</h6></ListGroup.Item>
                                    <ListGroup.Item><h6><b>Car</b> : {info["car_make"]} {info["car_name"]}</h6></ListGroup.Item>
                                    <ListGroup.Item><h6><b>Car VIN</b> : {info["car_vin"]}</h6></ListGroup.Item>
                                    <ListGroup.Item><h6><b>Distance Travelled by Car prior to booking</b> : {info["car_totaldistance"]-info["distance"]} km</h6></ListGroup.Item>
                                    <ListGroup.Item><h6><b>Starting Point</b> : {info["start"]}</h6></ListGroup.Item>
                                    <ListGroup.Item><h6><b>Destination</b> : {info["destination"]}</h6></ListGroup.Item>
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }

}
