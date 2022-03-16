import React, { useRef } from "react"
import { createMessage, getMessages } from "../../managers/MessageManager"


export default ({ host, vendor, setMessages }) => {
    const body = useRef()

    const handleSubmit = (e) => {
        e.preventDefault()

        createMessage({
            vendor: vendor.id,
            host: host.id,
            body: body.current.value
        })
            .then(() => getMessages(host.id, vendor.id))
            .then(setMessages)
            .then(() => body.current.value = null)
    }

    return (
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
    )
}