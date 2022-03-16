import { deleteHostVendor } from "../../managers/HostVendorManager"
import { createMessage, getMessages } from "../../managers/MessageManager"

export default ({openDenyModal, setOpenDenyModal, hostVendor, setHostVendor, host, vendor, setMessages}) => {

    return (
        <>
            <div id="edit-modal" className={openDenyModal ? "modal is-active" : "modal"}>
                <div className="modal-background"></div>
                <div className="modal-content">
                    <div className="box">
                        <button className="delete" onClick={() => setOpenDenyModal(false)}></button>
                        <p>Inform this host that you cannot commit to their event?</p>
                        <button className="button" onClick={() => setOpenDenyModal(false)}>
                            No
                        </button>
                        <button className="button" onClick={() => {
                            deleteHostVendor(hostVendor.id)
                                .then(() => {
                                    createMessage({
                                        host: host.id,
                                        vendor: vendor.id,
                                        body: `${vendor.business_name} has denied your request for a quote.`
                                    })
                                })
                                .then(() => getMessages(host.id, vendor.id))
                                .then(setMessages)
                                .then(() => setHostVendor(null))
                                .then(() => setOpenDenyModal(false))
                        }}>
                            Yes
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}