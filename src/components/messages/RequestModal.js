import { createHostVendor, fireHostVendor } from "../../managers/HostVendorManager"
import { createMessage, getMessages } from "../../managers/MessageManager"

export default ({openRequestModal, setOpenRequestModal, setHostVendor, host, vendor, setMessages}) => {

    return (
        <>
            <div id="edit-modal" className={openRequestModal ? "modal is-active" : "modal"}>
                <div className="modal-background"></div>
                <div className="modal-content">
                    <div className="box">
                        <button className="delete" onClick={() => setOpenRequestModal(false)}></button>
                        <p>Send your wedding details to the vendor and request a quote?</p>
                        <button className="button" onClick={() => setOpenRequestModal(false)}>
                            No
                        </button>
                        <button className="button" onClick={() => {
                            createHostVendor({vendor: vendor.id})
                                .then(setHostVendor)
                                .then(() => {
                                    createMessage({
                                        host: host.id,
                                        vendor: vendor.id,
                                        body: `${host.user.first_name} ${host.user.last_name} has requested a quote for your services.
                                        Their wedding is at ${host.time} on ${host.date}. 
                                        It will be held at ${host.street_address}, ${host.city}, ${host.state} ${host.zip_code}.
                                        The guest count will be in the ${host.wedding_size.label} range.`
                                    })
                                })
                                .then(() => getMessages(host.id, vendor.id))
                                .then(setMessages)
                                .then(() => setOpenRequestModal(false))
                        }}>
                            Yes
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}