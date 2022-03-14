import React, { useRef } from "react"
import { Link, useHistory } from "react-router-dom"


export const Login = () => {
    const username = useRef()
    const password = useRef()
    const invalidDialog = useRef()
    const history = useHistory()

    const handleLogin = (e) => {
        e.preventDefault()

        return fetch("http://127.0.0.1:8000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                username: username.current.value,
                password: password.current.value
            })
        })
            .then(res => res.json())
            .then(res => {
                if ("valid" in res && res.valid && "token" in res) {
                    localStorage.setItem("rare_token", res.token)
                    history.push("/")
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
                <h1 className="title">Rare Publishing</h1>
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
                    <Link to="/register">Not a member yet?</Link>
                </section>
            </form>
        </main>
    )
}
