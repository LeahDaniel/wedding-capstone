import { useRef } from "react"
import { quoteHostVendor } from "../../managers/HostVendorManager"
import { createMessage, getMessages } from "../../managers/MessageManager"

export const QuoteModal = ({ openQuoteModal, setOpenQuoteModal, hostVendor, setHostVendor, host, vendor, setMessages }) => {
    const costPerHour = useRef()

    return (
        <>
            <div id="edit-modal" className={openQuoteModal ? "modal is-active" : "modal"}>
                <div className="modal-background"></div>
                <div className="modal-content">
                    <div className="box">
                        <p className="p-4">Accept this hire request and send a quote of:</p>
                        <fieldset className="field mb-5">
                            <div className="control is-flex">
                                <p className="pl-5">$</p>
                                <input className="input mx-5" ref={costPerHour} type="number" name="costPerHour" required />
                                <p className="pr-5">/hr</p>
                            </div>
                        </fieldset>
                        
                        <button className="button mx-1" onClick={() => {
                            quoteHostVendor(hostVendor.id, costPerHour.current.value)
                                .then((res) => {
                                    createMessage({
                                        host: host.id,
                                        vendor: vendor.id,
                                        body: `${vendor.business_name} has sent you
                                        a quote of $${res.cost_per_hour}. Accept the quote with the button above to continue.`
                                    }).then(() => getMessages(host.id, vendor.id))
                                        .then(setMessages)
                                    setHostVendor(res)
                                })
                                .then(() => setOpenQuoteModal(false))
                        }}>
                            Submit
                        </button>
                        <button className="button mx-1" onClick={() => setOpenQuoteModal(false)}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}