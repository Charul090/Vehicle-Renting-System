import React,{useState} from 'react'
import {Container, Row, Col, Card, Form, Button} from "react-bootstrap"
import {Register_Query} from "../../Redux/register/action.js"
import {useDispatch,useSelector} from "react-redux"

export default function Register() {

    const [first_name,setName]=useState("")
    const [last_name,setLastname]=useState("")
    const [username,setUsername]=useState("")
    const [password,setPassword]=useState("")

    const [warning,setWarning]=useState(false)
    const [warning_message,setMessage]=useState("")

    const dispatch=useDispatch()
    const {error,message}=useSelector(state=>state.regis)

    const handleSubmit=(e)=>{
        e.preventDefault()

        setWarning(false)
        setMessage("")

        if( first_name !== "" &&
            last_name !== "" &&
            username !== "" &&
            password !== ""
            ){
                let data={
                    first_name,
                    last_name,
                    username,
                    password
                }

                dispatch(Register_Query(data))
            }
        else{
            setWarning(true)
            setMessage("Please fill all the fields")

        }
    }

    return (
        <Container>
            <Row className="justify-content-center mt-5">
                <Col xs={12} sm={11} md={8} lg={6}>
                    <Card className="p-3">
                        <Card.Body>
                            <p className="text-danger">{warning?warning_message:error?message:null}</p>
                            <p className="text-success">{!error && message && !warning !== ""?message:null}</p>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group>
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control value={first_name} onChange={(e)=>{setName(e.target.value)}} type="text" placeholder="Your First Name" ></Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control value={last_name} onChange={(e)=>{setLastname(e.target.value)}} type="text" placeholder="Your Last Name" ></Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control value={username} onChange={(e)=>{setUsername(e.target.value)}} type="text" placeholder="Username" ></Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control value={password} onChange={(e)=>{setPassword(e.target.value)}} type="password" placeholder="Password" ></Form.Control>
                                </Form.Group>
                                <Button type="submit" variant="success" block>REGISTER</Button>
                            </Form>
                        </Card.Body>
                    </Card>    
                </Col>
            </Row>
        </Container>
    )
}
