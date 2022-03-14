import React, { useRef } from "react"
import { Link} from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const navbar = useRef()
    const hamburger = useRef()

    const showMobileNavbar = () => {
        hamburger.current.classList.toggle('is-active')
        navbar.current.classList.toggle('is-active')
    }

    return (
        <nav className="navbar is-success mb-3 py-2" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <a className="navbar-item" href="/">
                </a>

                <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" onClick={showMobileNavbar} ref={hamburger}>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div className="navbar-menu" ref={navbar}>
                <div className="navbar-start">
                    <Link to="/posts" className="navbar-item has-text-weight-semibold">Posts</Link>
                    <Link to="/my-posts" className="navbar-item has-text-weight-semibold">My Posts</Link>
                    <Link to="/newpost" className="navbar-item has-text-weight-semibold">New Post</Link>
                </div>
            </div>
        </nav>
    )
}
