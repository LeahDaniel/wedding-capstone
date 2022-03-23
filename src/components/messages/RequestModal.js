import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { createHostVendor } from "../../managers/HostVendorManager"
import { createMessage, getMessages } from "../../managers/MessageManager"

export const RequestModal = ({openRequestModal, setOpenRequestModal, setHostVendor, host, vendor, setMessages}) => {
    const history = useHistory()
    const [date, setDate] = useState("")
    const [time, setTime] = useState("")

    useEffect(() => {
        const date = new Date(host.date).toLocaleDateString()
        const time = new Date('1970-01-01T' + host.time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })

        setDate(date)
        setTime(time)
    }, [host])
    
    return (
        <>
            <div id="edit-modal" className={openRequestModal ? "modal is-active" : "modal"}>
                <div className="modal-background"></div>
                <div className="modal-content">
                    <div className="box">
                        <p className="p-4">Send your wedding details to the vendor and request a quote?</p>
                        <button className="button mx-1" onClick={() => {
                            createHostVendor({vendor: vendor.id})
                                .then(setHostVendor)
                                .then(() => {
                                    createMessage({
                                        host: host.id,
                                        vendor: vendor.id,
                                        body: `${host.user.first_name} ${host.user.last_name} has requested a quote for your services.
                                        Their wedding is at ${time} on ${date}. 
                                        It will be held at ${host.street_address}, ${host.city}, ${host.state} ${host.zip_code}.
                                        The guest count will be in the ${host.wedding_size.label} range.`
                                    })
                                    .then(() => {
                                        if (setMessages) {
                                            getMessages(host.id, vendor.id)
                                                .then(setMessages)
                                        } else {
                                            history.push('/messages')
                                        }
                                    })
                                })
                                .then(() => setOpenRequestModal(false))
                        }}>
                            Yes
                        </button>
                        <button className="button mx-1" onClick={() => setOpenRequestModal(false)}>
                            No
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}