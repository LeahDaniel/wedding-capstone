import { useEffect, useRef, useState } from "react"
import { getWeddingSizes } from "../auth/AuthManager"
import { updateCurrentHost } from "../../managers/HostManager"

export default ({ openEditModal, setOpenEditModal, host, setHost }) => {
    const weddingSizeId = useRef()
    const date = useRef()
    const time = useRef()
    const streetAddress = useRef()
    const city = useRef()
    const state = useRef()
    const zipCode = useRef()
    const [weddingSizes, setWeddingSizes] = useState([])

    useEffect(() => {
        getWeddingSizes().then(setWeddingSizes)
    }, [])

    useEffect(() => {
        weddingSizeId.current.value = host.wedding_size?.id
        date.current.value = host.date
        time.current.value = host.time
        streetAddress.current.value = host.street_address
        city.current.value = host.city
        state.current.value = host.state
        zipCode.current.value = host.zip_code
    }, [host])



    const editHost = (e) => {
        e.preventDefault()

        const newHost = {
            wedding_size: weddingSizeId.current.value,
            date: date.current.value,
            time: time.current.value,
            street_address: streetAddress.current.value,
            city: city.current.value,
            state: state.current.value,
            zip_code: zipCode.current.value
        }

        updateCurrentHost(newHost)
            .then(setHost)
            .then(() => setOpenEditModal(false))


    }

    return (
        <>
            <div id="edit-modal" className={openEditModal ? "modal is-active" : "modal"}>
                <div className="modal-background"></div>
                <div className="modal-content has-background-white">
                    <form className="column mt-6 is-two-thirds" onSubmit={editHost}>
                        <h1 className="title">Edit Your Wedding</h1>
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
                                <input className="input" ref={streetAddress} type="text" name="streetAddress" placeholder="First name" required autoFocus />
                            </div>
                        </fieldset>
                        <fieldset className="field mb-5">
                            <label className="label" htmlFor="city"> Venue City </label>
                            <div className="control">
                                <input className="input" ref={city} type="text" name="city" placeholder="First name" required autoFocus />
                            </div>
                        </fieldset>
                        <fieldset className="field mb-5">
                            <label className="label" htmlFor="state"> Venue State </label>
                            <div className="control">
                                <input className="input" ref={state} type="text" name="state" placeholder="First name" required autoFocus />
                            </div>
                        </fieldset>
                        <fieldset className="field mb-5">
                            <label className="label" htmlFor="zipCode"> Venue Zip Code </label>
                            <div className="control">
                                <input className="input" ref={zipCode} type="text" name="zipCode" placeholder="First name" required autoFocus />
                            </div>
                        </fieldset>
                        <fieldset className="field mb-5">
                            <button className="button is-link" type="submit">Submit</button>
                        </fieldset>
                        <fieldset className="field mb-5">
                            <button className="button is-link" onClick={() => setOpenEditModal(false)}>Cancel</button>
                        </fieldset>
                    </form>
                </div>
            </div>
        </>
    )
}