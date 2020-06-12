import React from 'react'
import { Container, Card ,Row,Col} from 'react-bootstrap'
import { useSelector } from "react-redux"

export default function Confirmation() {


    let {info}=useSelector(state=>state.ride)

    console.log(info)

    return (
        <Container>
            <Row className="justify-content-center">
                <Col xs={12} md={6}>
                    <Card className="shadow-sm">
                        <Card.Body>

                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}
