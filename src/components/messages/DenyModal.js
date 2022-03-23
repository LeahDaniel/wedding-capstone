import { deleteHostVendor } from "../../managers/HostVendorManager"
import { createMessage, getMessages } from "../../managers/MessageManager"

export const DenyModal = ({ openDenyModal, setOpenDenyModal, hostVendor, setHostVendor, host, vendor, setMessages }) => {

    return (
        <>
            <div id="edit-modal" className={openDenyModal ? "modal is-active" : "modal"}>
                <div className="modal-background"></div>
                <div className="modal-content">
                    <div className="box">
                        <p className="p-4">Inform this host that you cannot commit to their event?</p>
                        <div className="mt-3">
                            
                            <button className="button mx-1" onClick={() => {
                                deleteHostVendor(hostVendor.id)
                                    .then(() => {
                                        createMessage({
                                            host: host.id,
                                            vendor: vendor.id,
                                            body: `${vendor.business_name} has denied your request for a quote.`
                                        })
                                            .then(() => getMessages(host.id, vendor.id))
                                            .then(setMessages)
                                    })

                                    .then(() => setHostVendor(null))
                                    .then(() => setOpenDenyModal(false))
                            }}>
                                Yes
                            </button>
                            <button className="button mx-1" onClick={() => setOpenDenyModal(false)}>
                                No
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}