import { useRef } from "react"
import { createMessage, getMessages, quoteHostVendor } from "../VendorManager"

export default ({openQuoteModal, setOpenQuoteModal, hostVendor, setHostVendor, host, vendor, setMessages}) => {
    const costPerHour = useRef()

    return (
        <>
            <div id="edit-modal" className={openQuoteModal ? "modal is-active" : "modal"}>
                <div className="modal-background"></div>
                <div className="modal-content">
                    <div className="box">
                        <button className="delete" onClick={() => setOpenQuoteModal(false)}></button>
                        <p>Accept this hire request and send a quote of:</p>
                        <fieldset className="field mb-5">
                            <div className="control">
                                $<input className="input" ref={costPerHour} type="number" name="costPerHour" required />/hr
                            </div>
                        </fieldset>
                        <button className="button" onClick={() => setOpenQuoteModal(false)}>
                            Cancel
                        </button>
                        <button className="button" onClick={() => {
                            quoteHostVendor(hostVendor.id, costPerHour.current.value)
                                .then((res) => {
                                    createMessage({
                                        host: host.id,
                                        vendor: vendor.id,
                                        body: `${vendor.business_name} has sent you
                                        a quote of $${res.cost_per_hour}. Accept the quote with the button above to continue.`
                                    })
                                    setHostVendor(res)
                                })
                                .then(() => getMessages(host.id, vendor.id))
                                .then(setMessages)
                                .then(() => setOpenQuoteModal(false))
                        }}>
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}