import React, { useRef } from "react"
import { Link, useHistory } from "react-router-dom"
import "./NavBar.css"
import Logo from "../../images/wedding-ring.png"

export const NavBar = () => {
    const navbar = useRef()
    const hamburger = useRef()
    const history = useHistory()

    const showMobileNavbar = () => {
        hamburger.current.classList.toggle('is-active')
        navbar.current.classList.toggle('is-active')
    }

    return (
        <nav className="navbar is-dark mb-3 py-2" role="navigation" aria-label="main navigation">
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
            </div>

            <div className="navbar-end">
                <div className="navbar-item">
                    <div className="buttons">
                        <button className="button is-outlined" onClick={() => {
                            localStorage.removeItem('vendor_token')
                            localStorage.removeItem('host_token')
                            history.push('/login')
                        }}>Logout</button>
                    </div>
                </div>
            </div>
        </nav>
    )
}
