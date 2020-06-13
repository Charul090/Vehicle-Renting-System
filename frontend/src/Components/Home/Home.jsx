import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { Link, useHistory, Redirect } from "react-router-dom"
import { Car_Query } from "../../Redux/car_home/action.js"
import { Location_Query } from "../../Redux/location/action.js"
import { Container, Row, Col, Card, Form, ListGroup, ListGroupItem, Button } from 'react-bootstrap'
import { distance } from "./distance.js"
import DateTime from "datetime-js"
import { Send_Ride_Query } from "../../Redux/ride/action.js"
import Confirmation from '../Confirmation/Confirmation.jsx'

export default function Home() {

    let history = useHistory()
    let dispatch = useDispatch()

    let { logged_in, token } = useSelector(state => state.user)
    let {status} =useSelector(state=>state.ride)
    let car_data = useSelector(state => state.carhome.data)
    let location_data = useSelector(state => state.location.data)

    const [car, setCar] = useState("3")
    const [destination, setDestination] = useState("1")
    const [total_distance, setDistance] = useState(0)
    const [complete, setComplete] = useState(false)

    const current_car = car_data.find((elem) => elem.car_id === Number(car))


    useEffect(() => {

        if (logged_in) {
            dispatch(Car_Query())
            dispatch(Location_Query())
        }
        else {
            history.push("/userlogin")
        }
    }, [])

    useEffect(() => {

        if (destination !== undefined && current_car !== undefined) {
            let curr_info = location_data.find((elem) => elem.location_id === current_car.location_id)

            let dest_info = location_data.find((elem) => elem.location_id === Number(destination))

            if (current_car.location_id === Number(destination)){
                if(current_car.location_id === 1){
                    setDestination("2")
                }
                else{
                    setDestination("1")
                }
            }
            else {
                if (curr_info && dest_info) {
                    let lat1 = Number(curr_info.latitude)
                    let lon1 = Number(curr_info.longitutde)
                    let lat2 = Number(dest_info.latitude)
                    let lon2 = Number(dest_info.longitutde)

                    setDistance(parseInt(distance(lat1, lon1, lat2, lon2)))
                }
            }


        }

    }, [current_car, destination, location_data])

    const handleClick = () => {
        let car_id = Number(car)

        var dateObj = new Date()

        let time = DateTime(dateObj, '%Y-%m-%d %H:%i:%s')


        let obj = {
            car_id,
            token,
            time,
            distance: total_distance,
            start: current_car.location_id,
            destination: Number(destination)
        }

        dispatch(Send_Ride_Query(obj))
        setComplete(true)
    }


    if (complete && status) {
        return (
            <>
                <Redirect to="/confirmation" />
            </>
        )
    }
    else {
        return (
            <Container>
                <h1 className="text-center">Rent a Car and Ride NOW!</h1>
                <Row>
                    <Col md={{ span: 6, offset: 0 }} className="mb-3 mb-md-0">
                        <Card className="shadow-sm">
                            <Card.Body>
                                <Form.Group>
                                    <Form.Label>
                                        Select Car
                                    </Form.Label>
                                    <Form.Control as="select" value={car} onChange={(e) => { setCar(e.target.value) }}>
                                        {car_data && car_data.map((elem) => {
                                            return <option value={elem.car_id} key={elem.car_vin}>{elem.car_make} {elem.car_model}</option>
                                        })}
                                    </Form.Control>
                                </Form.Group>
                                <ListGroup>
                                    {current_car &&
                                        <>
                                            <ListGroupItem>Car Make: {current_car.car_make}</ListGroupItem>
                                            <ListGroupItem>Model: {current_car.car_model}</ListGroupItem>
                                            <ListGroupItem>Color: {current_car.car_color}</ListGroupItem>
                                            <ListGroupItem>Car VIN: {current_car.car_vin}</ListGroupItem>
                                            <ListGroupItem>Current Location: {current_car.location}</ListGroupItem>
                                        </>
                                    }
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={{ span: 6 }}>
                        <Card className="shadow-sm">
                            <Card.Body>
                                <Form.Group>
                                    <Form.Label>
                                        Current Location
                                    </Form.Label>
                                    <p className="lead">{current_car === undefined?null:current_car.location}</p>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>
                                        Select Destination
                                    </Form.Label>
                                    <Form.Control as="select" value={destination} onChange={(e) => { setDestination(e.target.value) }}>
                                        {location_data.length === 0 || current_car === undefined ? null : location_data.filter((elem) => {
                                            return elem.location_id !== Number(current_car.location_id)
                                        }).map((elem) => {
                                            return <option value={elem.location_id} key={`${elem.location_id}-x`}>{elem.location}</option>
                                        })}
                                    </Form.Control>
                                </Form.Group>
                                <h4 className="font-weight-normal">Total Distance:{total_distance && total_distance} km</h4>
                                <Button variant="danger" onClick={handleClick} block>Take a Ride</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}
