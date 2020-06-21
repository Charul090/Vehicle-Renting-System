import React from 'react'
import { Link } from "react-router-dom"
import styles from "./SideBar.module.css"
import { Nav } from "react-bootstrap"

export default function SideBar() {
    return (
        <div className={styles.container}>
            <div className={styles.heading}>
                <h4 className="text-center">DASHBOARD</h4>
            </div>
            <Nav justify className="flex-column mt-5">
                <Nav.Item className="my-2">
                    <Link to="/admin/dashboard">Home</Link>
                </Nav.Item>
                <Nav.Item className="my-2">
                    <Link to="dashboard/history">All Transactions</Link>
                </Nav.Item>
            </Nav>
        </div>
    )
}
