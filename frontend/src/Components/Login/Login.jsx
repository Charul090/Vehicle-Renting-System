import React, { useState } from 'react'
import {Container, Row, Col, Card, Form, Button} from "react-bootstrap"
import {useDispatch,useSelector} from "react-redux"
import {User_Query,Admin_Query} from "../../Redux/login/action.js"

export default function Login({user}) {

    const [username,setUsername]=useState("")
    const [password,setPassword]=useState("")

    const [warning,setWarning]=useState(false)
    const [warning_message,setMessage]=useState("")

    let {request,logged_in,message} =useSelector(state=>state.user)

    

    const dispatch = useDispatch()

    const handleSubmit=(e)=>{
        e.preventDefault()

        setWarning(false)
        setMessage("")

        if(username !== "" && password !== ""){
            let info={
                username,
                password
            }

            if(user === "admin"){
                dispatch(Admin_Query(info))
            }
            else{
                dispatch(User_Query(info))
            }

            
        }
        else{
            setWarning(true)
            setMessage("Please fill the fields")
        }
    }

    return (
        <Container>
            <Row className="justify-content-center mt-5">
                <Col xs={12} sm={11} md={8} lg={6}>
                    <Card className="pt-xs-3 p-sm-3">
                        <p className="text-danger">{warning?warning_message:request && !logged_in?message:null}</p>
                        <p className="text-success">{warning?null:request && logged_in?message:null}</p>
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group>
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control value={username} onChange={(e) => { setUsername(e.target.value) }} type="text" placeholder="Username" ></Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control value={password} onChange={(e) => { setPassword(e.target.value) }} type="password" placeholder="Password" ></Form.Control>
                                </Form.Group>
                                <Button type="submit" variant="success" block>Login</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}
