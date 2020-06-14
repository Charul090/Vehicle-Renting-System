import React,{useState, useEffect} from 'react'
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import styles from "./Header.module.css"
import { FaHamburger } from "react-icons/fa";
import { IconContext } from "react-icons";
import { useMediaQuery } from 'react-responsive'

export default function Header() {

    let { logged_in } = useSelector(state => state.user)

    const [display,setDisplay] = useState(false)

    const match=useMediaQuery({query:"(max-device-width:562px)"})

    const handleClick=()=>{
        setDisplay(!display)
    }

    useEffect(()=>{
        if(!match){
            setDisplay(false)
        }
    },[match])

    if(match){
        return (
            <header className="py-3 border-bottom border-light shadow-sm">
                <div className={styles.container1}>
                    <IconContext.Provider value={{className: styles.icon}}>
                        <div className={styles.icon_container}>
                            <FaHamburger onClick={handleClick}/>
                        </div>
                    </IconContext.Provider>
                    <h3 className={styles.title}>
                        frEEway
                    </h3>
                    <div>
    
                    </div>
                </div>
                {display?
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
                                {logged_in ?
                                    <div>
                                        <Link to="/prevride">
                                            Previous Rides
                                        </Link>
                                    </div>
                                    : null
                                }
                            </div>
                            :null}
            </header>
        )

    }

    return (
        <header className="py-3 border-bottom border-light shadow-sm d-flex justify-content-between">
            <div className={styles.container1}>
                <h3 className={styles.title}>
                    frEEway
                </h3>
            </div>
            <div className={styles.container2}>
                <div>
                    <Link to="/">Rent Car</Link>
                </div>
                {logged_in ?
                    <div>
                        <Link to="/prevride">
                            Previous Rides
                        </Link>
                    </div>
                    : null
                }
                <div>
                    <Link to="/userlogin">
                        {logged_in ? "Profile" : "Login"}
                    </Link>
                </div>
                {logged_in ? null :
                    <div>
                        <Link to="/register">Register</Link>
                    </div>
                }
                {logged_in ? null :
                    <div>
                        <Link to="/adminlogin">Admin</Link>
                    </div>
                }
            </div>
        </header>
    )
}
