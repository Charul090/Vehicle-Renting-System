import React from 'react'
import { Link } from "react-router-dom"
import styles from "./Header.module.css"

export default function Header() {
    return (
        <header className="py-3">
            <div className={styles.container1}>
                <h3>
                    frEEway
                </h3>
            </div>
            <div className={styles.container2}>
                <div>
                    <Link to="/">Home</Link>
                </div>
                <div>
                    <Link to="/userlogin">Login</Link>
                </div>
                <div>
                    <Link to="/adminlogin">Admin</Link>
                </div>
            </div>
        </header>
    )
}
