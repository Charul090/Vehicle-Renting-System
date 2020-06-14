import React,{useState,useEffect} from 'react'
import {Container, Row, Col, Card, Form, Button} from "react-bootstrap"
import {Register_Query,Clear_Register_State} from "../../Redux/register/action.js"
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

    useEffect(() => {
        
        return () => {
            dispatch(Clear_Register_State())
        }
    }, [])

    return (
        <Container>
            <Row className="justify-content-center mt-5">
                <Col xs={12} sm={11} md={8} lg={6}>
                    <Card className="p-3 border-green">
                        <Card.Body>
                            <h3 className="text-center mb-4">Sign up to Rent a car and travel</h3>
                                    {warning?<p className="text-danger">{warning_message}</p>
                                    :error?<p className="text-danger">{message}</p>
                                    :null}
                            {!error && message && !warning !== ""?<p className="text-success">{message}</p>:null}
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
                                <Button type="submit" variant="success" block>Sign Up</Button>
                            </Form>
                        </Card.Body>
                    </Card>    
                </Col>
            </Row>
        </Container>
    )
}
