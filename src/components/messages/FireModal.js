import { fireHostVendor } from "../../managers/HostVendorManager"
import { createMessage, getMessages } from "../../managers/MessageManager"

export default ({openFireModal, setOpenFireModal, hostVendor, setHostVendor, host, vendor, setMessages}) => {

    return (
        <>
            <div id="edit-modal" className={openFireModal ? "modal is-active" : "modal"}>
                <div className="modal-background"></div>
                <div className="modal-content">
                    <div className="box">
                        <button className="delete" onClick={() => setOpenFireModal(false)}></button>
                        <p>Are you sure? The vendor will be notified and you will be responsible for any cancellation fees.</p>
                        <button className="button" onClick={() => setOpenFireModal(false)}>
                            No
                        </button>
                        <button className="button" onClick={() => {
                            fireHostVendor(hostVendor.id)
                                .then(setHostVendor)
                                .then(() => {
                                    createMessage({
                                        host: host.id,
                                        vendor: vendor.id,
                                        body: `${host.user.first_name} ${host.user.last_name} has fired you from their event. Please reach out to them with any contract issues.`
                                    })
                                })
                                .then(() => getMessages(host.id, vendor.id))
                                .then((res) => {
                                    if(setMessages){
                                        setMessages(res)
                                    }
                                })
                                .then(() => setOpenFireModal(false))
                        }}>
                            Yes
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}