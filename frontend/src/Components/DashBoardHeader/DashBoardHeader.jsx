import React, { useState } from 'react'
import { Dropdown, DropdownButton } from 'react-bootstrap'
import styles from "./DashBoardHeader.module.css"
import { Link } from "react-router-dom"
import { useMediaQuery } from "react-responsive"
import { useDispatch } from 'react-redux'
import { Logout } from "../../Redux/login/action.js"
import { FaHamburger } from "react-icons/fa";
import { IconContext } from "react-icons";

export default function DashBoardHeader() {
    const deviceWidth = useMediaQuery({ query: '(max-width: 768px)' })

    const [visible, setVisible] = useState(false)

    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(Logout())
    }

    const handleClick = () => {
        setVisible(!visible)
    }

    if (deviceWidth) {
        return (
            <header className={styles.header}>
                <div className="d-flex py-3 px-2 justify-content-between">
                    <IconContext.Provider value={{ className: styles.icon }}>
                        <div className="p-0">
                            <FaHamburger onClick={handleClick} />
                        </div>
                    </IconContext.Provider>
                    <h4 className="text-center">DashBoard</h4>
                    <div>
                        {null}
                    </div>
                </div>
                {
                    visible ?
                        <div className="d-flex flex-column align-items-center p-2">
                            <div>
                                <Link to="/admin/dashboard">Home</Link>
                            </div>
                            <div>
                                <Link to="dashboard/history">All Transactions</Link>
                            </div>
                            <div>
                                <DropdownButton variant="outline-dark" title="Logout" size="sm">
                                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                                </DropdownButton>
                            </div>
                        </div>
                        :
                        null
                }
            </header>


        )
    }

    return (
        <header className={styles.header}>
            <div className="d-flex flex-md-row-reverse p-3 ">
                <div>
                    <DropdownButton variant="outline-dark" title="Logout" size="sm">
                        <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                    </DropdownButton>
                </div>
            </div>
        </header>
    )
}
