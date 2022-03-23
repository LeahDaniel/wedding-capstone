import { useHistory } from "react-router-dom"
import { hireHostVendor } from "../../managers/HostVendorManager"
import { createMessage, getMessages } from "../../managers/MessageManager"

export const HireModal = ({openHireModal, setOpenHireModal, hostVendor, setHostVendor, host, vendor, setMessages}) => {
    const history = useHistory()
    
    return (
        <>
            <div id="edit-modal" className={openHireModal ? "modal is-active" : "modal"}>
                <div className="modal-background"></div>
                <div className="modal-content">
                    <div className="box">
                        <p className="p-4">Accept this quote from the vendor and hire them for your event?</p>
                        
                        <button className="button mx-1" onClick={() => {
                            hireHostVendor(hostVendor.id)
                                .then(setHostVendor)
                                .then(() => {
                                    createMessage({
                                        host: host.id,
                                        vendor: vendor.id,
                                        body: `${host.user.first_name} ${host.user.last_name} has hired you for their event.`
                                    })
                                    .then(() => {
                                        if (setMessages) {
                                            getMessages(host.id, vendor.id)
                                                .then(setMessages)
                                        }else {
                                            history.push('/messages')
                                        }
                                    })
                                })
                                .then(() => setOpenHireModal(false))
                        }}>
                            Yes
                        </button>
                        <button className="button mx-1" onClick={() => setOpenHireModal(false)}>
                            No
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}