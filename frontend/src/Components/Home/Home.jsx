import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { Link, useHistory } from "react-router-dom"
import { Car_Query } from "../../Redux/car_home/action.js"
import { Location_Query } from "../../Redux/location/action.js"
import { Container, Row, Col, Card, Form, ListGroup, ListGroupItem, Button } from 'react-bootstrap'
import { distance } from "./distance.js"

export default function Home() {

    let history = useHistory()
    let dispatch = useDispatch()

    let { logged_in } = useSelector(state => state.user)
    let car_data = useSelector(state => state.carhome.data)
    let location_data = useSelector(state => state.location.data)

    const [car, setCar] = useState("3")
    const [destination, setDestination] = useState("1")
    const [total_distance, setDistance] = useState(0)

    const current_car = car_data.find((elem) => elem.car_id === Number(car))

    let current_location = null

    if (current_car) {
        current_location = [current_car.location_id, current_car.location]
    }


    useEffect(() => {
        dispatch(Car_Query())
        dispatch(Location_Query())
        /*if(logged_in){
            
        }
        else{
            history.push("/userlogin")
        }*/
    }, [])

    useEffect(() => {
        if (current_location !== null && destination !== undefined) {
            let curr_info = location_data.find((elem) => elem.location_id === current_location[0])
            let dest_info = location_data.find((elem) => elem.location_id === Number(destination))
            let x = ""
            if (curr_info && dest_info) {
                let lat1 = Number(curr_info.latitude)
                let lon1 = Number(curr_info.longitutde)
                let lat2 = Number(dest_info.latitude)
                let lon2 = Number(dest_info.longitutde)

                setDistance(parseInt(distance(lat1, lon1, lat2, lon2)))
            }
        }

    }, [current_location, destination])

    console.log(total_distance)

    return (
        <Container>
            <h1 className="text-center">Home</h1>
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
                                <Form.Control type="text" readOnly defaultValue={current_location && current_location[1]}></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>
                                    Select Destination
                                </Form.Label>
                                <Form.Control as="select" value={destination} onChange={(e) => { setDestination(e.target.value) }}>
                                    {location_data && location_data.filter((elem) => {
                                        return elem.location_id !== current_location[0]
                                    }).map((elem) => {
                                        return <option value={elem.location_id} key={`${elem.location_id}-x`}>{elem.location}</option>
                                    })}
                                </Form.Control>
                            </Form.Group>
                                <h4 className="font-weight-normal">Total Distance:{total_distance&&total_distance} km</h4>
                            <Button variant="danger" block>Take a Ride</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}
