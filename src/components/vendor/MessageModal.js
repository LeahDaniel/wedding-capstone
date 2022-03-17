import { useEffect, useRef, useState } from "react"
import { useHistory } from "react-router-dom"
import { getCurrentHost } from "../../managers/HostManager"
import { createMessage } from "../../managers/MessageManager"

export default ({ openMessageModal, setOpenMessageModal, vendor }) => {
    const body = useRef()
    const history = useHistory()
    const [host, setHost] = useState()

    useEffect(() => {
        getCurrentHost().then(setHost)
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()

        createMessage({
            vendor: vendor.id,
            host: host.id,
            body: body.current.value
        })
            .then(() => history.push("/messages"))
    }

    return (
        <>
            <div id="edit-modal" className={openMessageModal ? "modal is-active" : "modal"}>
                <div className="modal-background"></div>
                <div className="modal-content">
                    <div className="box">
                        <button className="delete" onClick={() => setOpenMessageModal(false)}></button>
                        <form onSubmit={handleSubmit}>
                            <fieldset className="field mb-5">
                                <div className="control">
                                    <textarea className="textarea" rows="3" ref={body} name="body" placeholder="Write a message..." required ></textarea>
                                </div>
                            </fieldset>

                            <fieldset className="field mb-5">
                                <button className="button is-link" type="submit">Send</button>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}