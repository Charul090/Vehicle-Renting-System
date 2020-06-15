import React, { useState, useEffect } from 'react'
import { Row, Col, Card } from "react-bootstrap"
import { Start_Stats_Query } from "../../Redux/stats/action.js"
import { useDispatch, useSelector } from "react-redux"
import { AiFillCar } from "react-icons/ai"
import {FaRupeeSign} from "react-icons/fa"
import { IconContext } from "react-icons"
import {GiPathDistance} from "react-icons/gi"
import {AiOutlineUser} from "react-icons/ai"
import styles from "./StatsPage.module.css"
import BarChart from '../BarChart/BarChart.jsx'

export default function StatsPage() {

    let dispatch = useDispatch()
    let { most_distance, stat, users_count } = useSelector(state => state.dashboard)

    useEffect(() => {
        dispatch(Start_Stats_Query())
    }, [])

    return (
        <div className="mt-4">
            <Row className={styles.cards_container}>
                <Col md={6} className="mb-3">
                    <Card className="p-4 text-center">
                        <h5>
                            <IconContext.Provider value={{ className: styles.icon1 }}>
                                <AiFillCar />
                            </IconContext.Provider>
                            Most distance
                        </h5>
                        <h4>{most_distance.car_make} {most_distance.car_name}</h4>
                    </Card>
                </Col>
                <Col md={6} className="mb-3">
                    <Card className="p-4 text-center">
                        <h5>
                            <IconContext.Provider value={{ className: styles.icon2 }}>
                                <FaRupeeSign />
                            </IconContext.Provider>
                            Total Earnings
                        </h5>
                        <h4>₹{stat.total_earning}</h4>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col md={6} className="mb-3">
                    <Card className="p-4 text-center">
                        <h5>
                            <IconContext.Provider value={{ className: styles.icon3 }}>
                                <AiOutlineUser />
                            </IconContext.Provider>
                            Number of Registered Users
                        </h5>
                        <h4>{users_count}</h4>
                    </Card>
                </Col>
                <Col md={6} className="mb-3">
                    <Card className="p-4 text-center">
                        <h5>
                            <IconContext.Provider value={{ className: styles.icon4 }}>
                                <GiPathDistance />
                            </IconContext.Provider>
                            Total distance
                        </h5>
                        <h4>{stat.total_distance}</h4>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col md={{span:10,offset:1}}>
                    <BarChart />
                </Col>
            </Row>
        </div>
    )
}
