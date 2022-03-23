import { fireHostVendor } from "../../managers/HostVendorManager"
import { createMessage, getMessages } from "../../managers/MessageManager"

export const QuitModal = ({ openQuitModal, setOpenQuitModal, hostVendor, setHostVendor, host, vendor, setMessages }) => {

    return (
        <>
            <div id="edit-modal" className={openQuitModal ? "modal is-active" : "modal"}>
                <div className="modal-background"></div>
                <div className="modal-content">
                    <div className="box">
                        <p className="p-4">Are you sure? The host will be notified.</p>
                        
                        <button className="button mx-1" onClick={() => {
                            fireHostVendor(hostVendor.id)
                                .then(setHostVendor)
                                .then(() => {
                                    createMessage({
                                        host: host.id,
                                        vendor: vendor.id,
                                        body: `${vendor.business_name} has withdrawn from your event and cannot be hired again.`
                                    })
                                        .then(() => getMessages(host.id, vendor.id))
                                        .then(setMessages)
                                })
                                .then(() => setOpenQuitModal(false))
                        }}>
                            Yes
                        </button>
                        <button className="button mx-1" onClick={() => setOpenQuitModal(false)}>
                            No
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}