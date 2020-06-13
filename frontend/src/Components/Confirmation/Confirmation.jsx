import React,{useEffect} from 'react'
import { Container, Card ,Row,Col, Button} from 'react-bootstrap'
import { useSelector,useDispatch } from "react-redux"
import {useHistory,Redirect} from "react-router-dom"
import {Clear_Ride} from "../../Redux/ride/action.js"

export default function Confirmation() {


    let {info,message,status}=useSelector(state=>state.ride)

    let history = useHistory()
    let dispatch = useDispatch()

    const handleClick=()=>{
        history.push("/")
    }

    useEffect(()=>{

        return ()=>{
            dispatch(Clear_Ride())
            history.push("/")
        }
    },[])

    if(!status){
        return <Redirect to="/"></Redirect>
    }


    return (
        <Container>
            <Row className="justify-content-center">
                <Col xs={12} md={8} lg={6}>
                    <h3>{message}</h3>
                    <Card className="shadow-sm">
                        <Card.Body>
                            <h4>UserName: {info.user_name}</h4>
                            <h4>From: {info.start}</h4>
                            <h4>Destination: {info.destination}</h4>
                            <h4>Car: {info.car_make} {info.car_model}</h4>
                            <h4>Time: {info.time}</h4>
                            <h4>Cost:  ₹{info.cost}</h4>
                            <Button variant="info" onClick={handleClick}>GO HOME</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}
