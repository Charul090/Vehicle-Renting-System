import React from 'react'
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import styles from "./Header.module.css"

export default function Header() {

    let { logged_in } = useSelector(state => state.user)



    return (
        <header className="py-3 border-bottom border-light shadow-sm">
            <div className={styles.container1}>
                <h3>
                    frEEway
                </h3>
            </div>
            <div className={styles.container2}>
                <div>
                    <Link to="/">Rent Car</Link>
                </div>
                {logged_in ? null :
                    <div>
                        <Link to="/register">Register</Link>
                    </div>
                }
                <div>
                    <Link to="/userlogin">
                        {logged_in ? "Profile" : "Login"}
                    </Link>
                </div>
                {logged_in ? null :
                    <div>
                        <Link to="/adminlogin">Admin</Link>
                    </div>
                }

            </div>
        </header>
    )
}
