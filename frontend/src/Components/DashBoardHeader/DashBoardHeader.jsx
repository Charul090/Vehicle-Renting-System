import React from 'react'
import { Dropdown, DropdownButton } from 'react-bootstrap'
import styles from "./DashBoardHeader.module.css"
import { Link } from "react-router-dom"
import { useMediaQuery } from "react-responsive"
import { useDispatch } from 'react-redux'
import {Logout} from "../../Redux/login/action.js"

export default function DashBoardHeader() {
    const deviceWidth = useMediaQuery({ query: '(max-width: 768px)' })

    const dispatch = useDispatch()

    const handleLogout=()=>{
        dispatch(Logout())
    }

    return (
        <header className={styles.header}>
            <div className="d-flex justify-content-around justify-content-md-start flex-md-row-reverse p-3 ">
                {
                    !deviceWidth ? null :
                        <>
                            <div>
                                <Link to="/admin/dashboard">Home</Link>
                            </div>
                            <div>
                                <Link to="dashboard/history">All Transactions</Link>
                            </div>
                        </>
                }
                <div>
                    <DropdownButton variant="outline-dark" title="Logout" size="sm">
                        <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                    </DropdownButton>
                </div>
            </div>
        </header>
    )
}
