import React, { useEffect, useRef, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import "./NavBar.css"
import Logo from "../../images/wedding-ring.png"
import { getCurrentVendor } from "../vendor/VendorManager"

export const NavBar = () => {
    const navbar = useRef()
    const hamburger = useRef()
    const dropdown = useRef()
    const history = useHistory()
    const [currentVendor, setCurrentVendor] = useState({})
    const [currentHost, setCurrentHost] = useState({})
    const [showProfilePic, setBoolean] = useState(true)

    useEffect(() => {
        if (localStorage.getItem("vendor_token")) {
            getCurrentVendor().then(setCurrentVendor)
        }
    }, [])

    const showMobileNavbar = () => {
        setBoolean(!showProfilePic)
        hamburger.current.classList.toggle('is-active')
        navbar.current.classList.toggle('is-active')
        dropdown.current.classList.toggle('navbar-dropdown')
        dropdown.current.classList.toggle('is-right')
    }

    return (
        <nav className="navbar is-dark mb-3 p-2" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <a className="navbar-item" href="/">
                    <img src={Logo} height="3rem" /> <h1 className="title is-4 has-text-white ml-2">Wedding Planning</h1>
                </a>
                <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" onClick={showMobileNavbar} ref={hamburger}>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div className="navbar-menu" ref={navbar}>
                <div className="navbar-start">
                    <Link to="/" className="navbar-item has-text-weight-semibold">Upcoming Events</Link>
                    <Link to="/messages" className="navbar-item has-text-weight-semibold">Messages</Link>
                </div>

                <div className="navbar-end pr-5 mr-5">
                    <div className="navbar-item has-dropdown is-hoverable">
                        {
                            currentVendor && showProfilePic
                                ? <img id="profile-nav" src={`http://localhost:8000${currentVendor.profile_image}`} />
                                : ""
                        }

                        <div className="navbar-dropdown is-right" ref={dropdown}>
                            <a href="/vendor/profile" className="navbar-item has-text-weight-semibold">
                                Business Profile
                            </a>
                            <hr className="navbar-divider" />
                            <a className="navbar-item has-text-weight-semibold" onClick={() => {
                                localStorage.removeItem('vendor_token')
                                localStorage.removeItem('host_token')
                                history.push('/login')
                            }}>
                                Logout
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}
