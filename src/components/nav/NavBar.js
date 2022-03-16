import React, { useEffect, useRef, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import "./NavBar.css"
import Logo from "../../images/wedding-ring.png"
import { getCurrentVendor } from "../../managers/VendorManager"
import { getCurrentHost } from "../../managers/HostManager"

export const NavBar = ({ isVendor, isHost}) => {
    const navbar = useRef()
    const hamburger = useRef()
    const dropdown = useRef()
    const history = useHistory()
    const [currentVendor, setCurrentVendor] = useState({})
    const [currentHost, setCurrentHost] = useState({})
    const [showProfilePic, setBoolean] = useState(true)

    useEffect(() => {
        if (isVendor) {
            getCurrentVendor().then(setCurrentVendor)
        } else if (isHost) {
            getCurrentHost().then(setCurrentHost)
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
                    {
                        isVendor
                            ? <>
                                <Link to="/" className="navbar-item has-text-weight-semibold">Upcoming Events</Link>
                                <Link to="/messages" className="navbar-item has-text-weight-semibold">Messages</Link>
                            </>
                            : ""
                    }
                    {
                        isHost
                            ? <>
                                <Link to="/vendors" className="navbar-item has-text-weight-semibold">Vendors</Link>
                                <Link to="/" className="navbar-item has-text-weight-semibold">Your Wedding</Link>
                                <Link to="/messages" className="navbar-item has-text-weight-semibold">Messages</Link>
                            </>
                            : ""
                    }

                </div>

                <div className="navbar-end pr-5 mr-5">
                    <div className="navbar-item has-dropdown is-hoverable">
                        {
                            isVendor && showProfilePic
                                ? <img id="profile-nav" src={`http://localhost:8000${currentVendor.profile_image}`} />
                                : ""
                        }
                        {
                            isHost && showProfilePic
                                ? <img id="profile-nav" src={`http://localhost:8000${currentHost.profile_image}`} />
                                : ""
                        }

                        <div className="navbar-dropdown is-right" ref={dropdown}>
                            {
                                isVendor
                                    ? <a href="/vendor/profile" className="navbar-item has-text-weight-semibold">
                                        Business Profile
                                    </a>
                                    : ""
                            }
                            {
                                isHost
                                    ? <a href="/hosts/profile" className="navbar-item has-text-weight-semibold">
                                        Profile
                                    </a>
                                    : ""
                            }

                            <hr className="navbar-divider" />
                            <a className="navbar-item has-text-weight-semibold" onClick={() => {
                                localStorage.removeItem('wedding_token')
                                localStorage.removeItem("is_vendor")
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
