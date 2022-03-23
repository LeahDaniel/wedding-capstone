import { fireHostVendor } from "../../managers/HostVendorManager"
import {useHistory} from 'react-router-dom'
import { createMessage, getMessages } from "../../managers/MessageManager"

export const FireModal = ({ openFireModal, setOpenFireModal, hostVendor, setHostVendor, host, vendor, setMessages }) => {
    const history = useHistory()
    return (
        <>
            <div id="edit-modal" className={openFireModal ? "modal is-active" : "modal"}>
                <div className="modal-background"></div>
                <div className="modal-content">
                    <div className="box">
                        <p className="p-4">Are you sure? The vendor will be notified and you will be responsible for any cancellation fees.</p>
                        
                        <button className="button mx-1" onClick={() => {
                            fireHostVendor(hostVendor.id)
                                .then(setHostVendor)
                                .then(() => {
                                    createMessage({
                                        host: host.id,
                                        vendor: vendor.id,
                                        body: `${host.user.first_name} ${host.user.last_name} has fired you from their event. Please reach out to them with any contract issues.`
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

                                .then(() => setOpenFireModal(false))
                        }}>
                            Yes
                        </button>
                        <button className="button mx-1" onClick={() => setOpenFireModal(false)}>
                            No
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}