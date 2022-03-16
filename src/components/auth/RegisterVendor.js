import React, { useEffect, useRef, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { getVendorTypes, getWeddingSizes, registerVendor } from "./AuthManager"

export const RegisterVendor = ({setIsVendor}) => {
    const history = useHistory()
    const firstName = useRef()
    const lastName = useRef()
    const username = useRef()
    const password = useRef()
    const verifyPassword = useRef()
    const passwordDialog = useRef()
    const usernameDialog = useRef()
    const vendorTypeId = useRef()
    const businessName = useRef()
    const yearsInBusiness = useRef()
    const description = useRef()
    const city = useRef()
    const state = useRef()
    const zipCode = useRef()
    const [string, setString] = useState("")
    const [vendorTypes, setVendorTypes] = useState([])
    const [weddingSizes, setWeddingSizes] = useState([])
    const [chosenWeddingSizes, setChosenWeddingSizes] = useState(new Set())

    useEffect(() => {
        getVendorTypes()
            .then(setVendorTypes)
            .then(getWeddingSizes)
            .then(setWeddingSizes)
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
                vendor_type_id: vendorTypeId.current.value,
                business_name: businessName.current.value,
                profile_image: string,
                years_in_business: yearsInBusiness.current.value,
                description: description.current.value,
                city: city.current.value,
                state: state.current.value,
                zip_code: zipCode.current.value,
                wedding_sizes: Array.from(chosenWeddingSizes)
            }

            registerVendor(newUser)
                .then(res => {
                    if ("token" in res) {
                        setIsVendor(true)
                        localStorage.setItem("is_vendor", true)
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
                        <input className="input" ref={firstName} type="text" name="firstName" placeholder="First name" required autoFocus />
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
                    <label className="label" htmlFor="profilePhoto">Business Profile Picture</label>
                    <input className="input" type="file" onChange={createImageString} />
                    <input className="file-input" type="hidden" name="profilePhoto" value={string} />
                </fieldset>
                <fieldset className="field my-5">
                    <label className="label">Vendor Type</label>
                    <div className="control">
                        <div className="select">
                            <select ref={vendorTypeId}>
                                <option> What do you specialize in? </option>
                                {
                                    vendorTypes.map(vendorType => {
                                        return <option key={vendorType.id} value={vendorType.id}>{vendorType.label}</option>
                                    })
                                }
                            </select>
                        </div>
                    </div>
                </fieldset>
                <fieldset className="field my-5">
                    <label className="label"> Sizes of weddings you are able to service </label>
                    {
                        weddingSizes.map(
                            (weddingSize) => {
                                return <div className="control my-2" key={weddingSize.id}>
                                    <label className="checkbox has-text-weight-medium">
                                        <input
                                            type="checkbox"
                                            className="mr-2"
                                            name="weddingSize"
                                            value={weddingSize.id}
                                            checked={chosenWeddingSizes.has(weddingSize.id) ? true : false}
                                            onChange={
                                                (evt) => {
                                                    const copy = new Set(chosenWeddingSizes)
                                                    copy.has(parseInt(evt.target.value))
                                                        ? copy.delete(parseInt(evt.target.value))
                                                        : copy.add(parseInt(evt.target.value))
                                                    setChosenWeddingSizes(copy)
                                                }} />
                                        {
                                            weddingSize.max_guests === null
                                                ? `${weddingSize.min_guests} + (${weddingSize.label} wedding)`
                                                : `${weddingSize.min_guests} - ${weddingSize.max_guests} (${weddingSize.label} wedding)`
                                        }
                                    </label>
                                </div>
                            }
                        )
                    }
                </fieldset>
                <fieldset className="field mb-5">
                    <label className="label" htmlFor="yearsInBusiness"> Years in Business</label>
                    <div className="control">
                        <input className="input" ref={yearsInBusiness} type="number" name="yearsInBusiness" required />
                    </div>
                </fieldset>
                <fieldset className="field mb-5">
                    <label className="label" htmlFor="businessName">Business Name</label>
                    <div className="control">
                        <input className="input" ref={businessName} type="text" name="businessName" required />
                    </div>
                </fieldset>
                <fieldset className="field mb-5">
                    <label className="label" htmlFor="description"> Business Description </label>
                    <div className="control">
                        <textarea className="textarea" ref={description} name="description" placeholder="Describe your business" required ></textarea>
                    </div>
                </fieldset>
                <fieldset className="field mb-5">
                    <label className="label" htmlFor="city"> City </label>
                    <div className="control">
                        <input className="input" ref={city} type="text" name="city" placeholder="Business city" required />
                    </div>
                </fieldset>
                <fieldset className="field mb-5">
                    <label className="label" htmlFor="state"> State </label>
                    <div className="control">
                        <input className="input" ref={state} type="text" name="state" placeholder="Business state" required />
                    </div>
                </fieldset>
                <fieldset className="field mb-5">
                    <label className="label" htmlFor="zipCode"> Zip Code </label>
                    <div className="control">
                        <input className="input" ref={zipCode} type="text" name="zipCode" placeholder="Business zip code" required />
                    </div>
                </fieldset>
                <fieldset className="field mb-5">
                    <button className="button is-link" type="submit">Register as a Vendor</button>
                </fieldset>
                <section className="mt-5 pb-5">
                    Already registered? <Link to="/login">Login</Link>
                </section>
            </form>
        </main>
    )
}