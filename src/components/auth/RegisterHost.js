import React, { useEffect, useRef, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { getWeddingSizes, registerHost } from "./AuthManager"

export const RegisterHost = ({setIsVendor}) => {
    const firstName = useRef()
    const lastName = useRef()
    const username = useRef()
    const password = useRef()
    const verifyPassword = useRef()
    const passwordDialog = useRef()
    const usernameDialog = useRef()
    const weddingSizeId = useRef()
    const date = useRef()
    const time = useRef()
    const streetAddress = useRef()
    const city = useRef()
    const state = useRef()
    const zipCode = useRef()
    const history = useHistory()
    const [string, setString] = useState("")
    const [weddingSizes, setWeddingSizes] = useState([])

    useEffect(() => {
        getWeddingSizes().then(setWeddingSizes)
    }, [])

    const getBase64 = (file, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(file);
    }

    const createImageString = (event) => {
        getBase64(event.target.files[0], (base64ImageString) => {
            setString(base64ImageString)
        });
    }

    const handleRegister = (e) => {
        e.preventDefault()

        if (password.current.value === verifyPassword.current.value) {
            const newUser = {
                username: username.current.value,
                password: password.current.value,
                first_name: firstName.current.value,
                last_name: lastName.current.value,
                wedding_size_id: weddingSizeId.current.value,
                profile_image: string,
                date: date.current.value,
                time: time.current.value,
                street_address: streetAddress.current.value,
                city: city.current.value,
                state: state.current.value,
                zip_code: zipCode.current.value
            }

            registerHost(newUser)
                .then(res => {
                    if ("token" in res) {
                        setIsVendor(false)
                        localStorage.setItem("is_vendor", false)
                        localStorage.setItem("wedding_token", res.token)
                        history.push("/")
                    } else {
                        usernameDialog.current.showModal()
                    }
                })
        } else {
            passwordDialog.current.showModal()
        }
    }



    return (
        <main className="columns container pl-2 is-centered">

            <dialog ref={passwordDialog}>
                <div>Passwords do not match</div>
                <button className="delete" onClick={e => passwordDialog.current.close()}>Close</button>
            </dialog>
            <dialog className="border-0" ref={usernameDialog}>
                <div className="d-flex flex-column">
                    <div>
                        <button className="delete" onClick={e => usernameDialog.current.close()}>Close</button>
                    </div>
                    <div className="m-4 pb-3">Username is not available</div>
                </div>
            </dialog>

            <form className="column mt-6 is-two-thirds" onSubmit={handleRegister}>
                <h1 className="title">Register an account</h1>
                <fieldset className="field mb-5">
                    <label className="label" htmlFor="firstName"> First Name </label>
                    <div className="control">
                        <input className="input" ref={firstName} type="text" name="firstName" placeholder="First name" required  autofocus/>
                    </div>
                </fieldset>
                <fieldset className="field mb-5">
                    <label className="label" htmlFor="lastName"> Last Name </label>
                    <div className="control">
                        <input className="input" ref={lastName} type="text" name="lastName" placeholder="Last name" required />
                    </div>
                </fieldset>
                <fieldset className="field mb-5">
                    <label className="label" htmlFor="inputUsername">Username</label>
                    <div className="control">
                        <input className="input" ref={username} type="text" name="username" placeholder="Username" required />
                    </div>
                </fieldset>
                <fieldset className="field mb-5">
                    <label className="label" htmlFor="inputPassword"> Password </label>
                    <div className="control">
                        <input className="input" ref={password} type="password" name="password" placeholder="Password" required />
                    </div>
                </fieldset>
                <fieldset className="field mb-5">
                    <label className="label" htmlFor="verifyPassword"> Verify Password </label>
                    <div className="control">
                        <input className="input" ref={verifyPassword} type="password" name="verifyPassword" placeholder="Verify password" required />
                    </div>
                </fieldset>
                <fieldset className="field mb-5">
                    <label className="label" htmlFor="profilePhoto">Profile Picture</label>
                    <input className="input" type="file" onChange={createImageString} />
                    <input className="file-input" type="hidden" name="profilePhoto" value={string} />
                </fieldset>
                <fieldset className="field my-5">
                    <label className="label">Wedding Size</label>
                    <div className="control">
                        <div className="select">
                            <select ref={weddingSizeId}>
                                <option> How many guests will be at your wedding? </option>
                                {
                                    weddingSizes.map(weddingSize => {
                                        return <option key={weddingSize.id} value={weddingSize.id}>
                                            {
                                                weddingSize.max_guests === null
                                                    ? `${weddingSize.min_guests} + (${weddingSize.label} wedding)`
                                                    : `${weddingSize.min_guests} - ${weddingSize.max_guests} (${weddingSize.label} wedding)`
                                            }
                                        </option>

                                    })
                                }
                            </select>
                        </div>
                    </div>
                </fieldset>
                <fieldset className="field mb-5">
                    <label className="label" htmlFor="date"> Wedding Date </label>
                    <div className="control">
                        <input className="input" ref={date} type="date" name="date" required />
                    </div>
                </fieldset>
                <fieldset className="field mb-5">
                    <label className="label" htmlFor="time"> Wedding Time</label>
                    <div className="control">
                        <input className="input" ref={time} type="time" name="time" required />
                    </div>
                </fieldset>
                <fieldset className="field mb-5">
                    <label className="label" htmlFor="streetAddress"> Venue Street Address </label>
                    <div className="control">
                        <input className="input" ref={streetAddress} type="text" name="streetAddress" placeholder="First name" required  />
                    </div>
                </fieldset>
                <fieldset className="field mb-5">
                    <label className="label" htmlFor="city"> Venue City </label>
                    <div className="control">
                        <input className="input" ref={city} type="text" name="city" placeholder="First name" required  />
                    </div>
                </fieldset>
                <fieldset className="field mb-5">
                    <label className="label" htmlFor="state"> Venue State </label>
                    <div className="control">
                        <input className="input" ref={state} type="text" name="state" placeholder="First name" required  />
                    </div>
                </fieldset>
                <fieldset className="field mb-5">
                    <label className="label" htmlFor="zipCode"> Venue Zip Code </label>
                    <div className="control">
                        <input className="input" ref={zipCode} type="text" name="zipCode" placeholder="First name" required  />
                    </div>
                </fieldset>
                <fieldset className="field mb-5">
                    <button className="button is-link" type="submit">Register as a Host</button>
                </fieldset>
                <section className="mt-5 pb-5">
                    Already registered? <Link to="/login">Login</Link>
                </section>
            </form>
        </main>
    )
}