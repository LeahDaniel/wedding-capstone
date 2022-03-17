import React, { useRef } from "react"
import { Link, useHistory } from "react-router-dom"
import { loginUser } from "./AuthManager"


export const Login = ({setIsVendor}) => {
    const username = useRef()
    const password = useRef()
    const invalidDialog = useRef()
    const history = useHistory()

    const handleLogin = (e) => {
        e.preventDefault()

        loginUser({
            username: username.current.value,
            password: password.current.value
        })
            .then(res => {
                if ("valid" in res && res.valid && "token" in res && res.is_staff) {
                    localStorage.setItem("is_vendor", true)
                    setIsVendor(true)
                    localStorage.setItem("wedding_token", res.token)
                    history.push("/")
                } else if (!res.is_staff) {
                    localStorage.setItem("is_vendor", false)
                    setIsVendor(false)
                    localStorage.setItem("wedding_token", res.token)
                    history.push("/vendors")
                }
                else {
                    invalidDialog.current.showModal()
                }
            })
    }

    return (
        <main className="columns container pl-2 is-centered">
            <dialog ref={invalidDialog}>
                <div>Username or password was not valid.</div>
                <button className="delete" onClick={e => invalidDialog.current.close()}>Close</button>
            </dialog>
            <form className="column mt-6 is-two-thirds" onSubmit={handleLogin}>
                <h1 className="title">Wedding Planning</h1>
                <h2 className="subtitle pt-2">Please sign in</h2>
                <fieldset className="field mb-5">
                    <label htmlFor="inputUsername" className="label"> Username address </label>
                    <div className="control">
                        <input ref={username} type="username" id="username" className="input" placeholder="Username address" required autoFocus />
                    </div>
                </fieldset>
                <fieldset className="field mb-5">
                    <label htmlFor="inputPassword" className="label"> Password </label>
                    <div className="control">
                        <input ref={password} type="password" id="password" className="input" placeholder="Password" required />
                    </div>
                </fieldset>
                <fieldset className="field mb-5">
                    <button className="button is-link" type="submit">Sign In</button>
                </fieldset>
                <section>
                    <p>Not a member yet?</p>
                    <p><Link to="/registerVendor">Register as a vendor</Link></p>
                    <p><Link to="/registerHost">Register as a host</Link></p>
                </section>
            </form>
        </main>
    )
}
