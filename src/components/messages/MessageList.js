import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { getCurrentHost, getHost } from "../../managers/HostManager"
import { getHostVendorByStakeholders } from "../../managers/HostVendorManager"
import { getMessages } from "../../managers/MessageManager"
import { getCurrentVendor, getVendor } from "../../managers/VendorManager"
import HireModal from "./HireModal"
import MessageForm from "./MessageForm"
import RequestModal from "./RequestModal"
import FireModal from "./FireModal"
import DenyModal from "./DenyModal"
import QuitModal from "./QuitModal"
import QuoteModal from "./QuoteModal"

export default ({ isVendor }) => {
    const { vendorId } = useParams()
    const { hostId } = useParams()
    const [host, setHost] = useState({})
    const [vendor, setVendor] = useState({})
    const [currentUserId, setCurrentUserId] = useState(null)
    const [hostVendor, setHostVendor] = useState(null)
    const [messages, setMessages] = useState([])
    const [openRequestModal, setOpenRequestModal] = useState(false)
    const [openHireModal, setOpenHireModal] = useState(false)
    const [openFireModal, setOpenFireModal] = useState(false)
    const [openQuitModal, setOpenQuitModal] = useState(false)
    const [openDenyModal, setOpenDenyModal] = useState(false)
    const [openQuoteModal, setOpenQuoteModal] = useState(false)

    useEffect(() => {
        if (isVendor) {
            getHost(hostId)
                .then(setHost)
                .then(getCurrentVendor)
                .then((res) => {
                    setVendor(res)
                    setCurrentUserId(res.user.id)
                })

        } else {
            getVendor(vendorId)
                .then(setVendor)
                .then(getCurrentHost)
                .then((res) => {
                    setHost(res)
                    setCurrentUserId(res.user.id)
                })
        }

    }, [vendorId, hostId, isVendor])

    useEffect(() => {
        if (host.id && vendor.id) {
            getHostVendorByStakeholders(host.id, vendor.id)
                .then((res) => {
                    if (res.found === false) {
                        setHostVendor(null)
                    } else {
                        setHostVendor(res)
                    }
                })
                .then(() => getMessages(host.id, vendor.id))
                .then(setMessages)
        }
    }, [host, vendor])

    return (
        <>
            <HireModal openHireModal={openHireModal} setOpenHireModal={setOpenHireModal}
                hostVendor={hostVendor} setHostVendor={setHostVendor}
                host={host} vendor={vendor} setMessages={setMessages} />
            <RequestModal openRequestModal={openRequestModal} setOpenRequestModal={setOpenRequestModal}
                hostVendor={hostVendor} setHostVendor={setHostVendor}
                host={host} vendor={vendor} setMessages={setMessages} />
            <FireModal openFireModal={openFireModal} setOpenFireModal={setOpenFireModal}
                hostVendor={hostVendor} setHostVendor={setHostVendor}
                host={host} vendor={vendor} setMessages={setMessages} />
            <DenyModal openDenyModal={openDenyModal} setOpenDenyModal={setOpenDenyModal}
                hostVendor={hostVendor} setHostVendor={setHostVendor}
                host={host} vendor={vendor} setMessages={setMessages} />
            <QuitModal openQuitModal={openQuitModal} setOpenQuitModal={setOpenQuitModal}
                hostVendor={hostVendor} setHostVendor={setHostVendor}
                host={host} vendor={vendor} setMessages={setMessages} />
            <QuoteModal openQuoteModal={openQuoteModal} setOpenQuoteModal={setOpenQuoteModal}
                hostVendor={hostVendor} setHostVendor={setHostVendor}
                host={host} vendor={vendor} setMessages={setMessages} />
            {
                isVendor
                    ? <>
                        <h1 className="subtitle">Messages with {host.user?.username}</h1>

                        <div id="button-controller-vendor">
                            {
                                hostVendor
                                    ? <>{
                                        hostVendor.cost_per_hour
                                            ? <>{
                                                hostVendor.hired
                                                    ? <>{
                                                        hostVendor.fired
                                                            ? "You are no longer employed by this host"
                                                            : <button
                                                                className='button'
                                                                onClick={() => setOpenQuitModal(true)}>
                                                                Quit
                                                            </button>
                                                    }</>
                                                    : "Waiting on host confirmation of rate"
                                            }
                                            </>
                                            : <>
                                                <button
                                                    className="button"
                                                    onClick={() => setOpenQuoteModal(true)}>
                                                    Send a Quote
                                                </button>
                                                <button
                                                    className="button"
                                                    onClick={() => setOpenDenyModal(true)}>
                                                    Deny Quote Request
                                                </button>
                                            </>
                                    }</>
                                    : "This host has not requested a quote"
                            }
                        </div>
                    </>
                    : <>
                        <h1 className="subtitle">Messages with {vendor.business_name}</h1>

                        <div id="button-controller-host">
                            {
                                hostVendor
                                    ? <>{
                                        hostVendor.cost_per_hour
                                            ? <>{
                                                hostVendor.hired
                                                    ? <>{
                                                        hostVendor.fired
                                                            ? "This vendor is no longer servicing your wedding."
                                                            : <button
                                                                className="button"
                                                                onClick={() => setOpenFireModal(true)}>
                                                                Fire Vendor
                                                            </button>
                                                    }</>
                                                    : <button
                                                        className="button"
                                                        onClick={() => setOpenHireModal(true)}>
                                                        Accept Quote and Hire
                                                    </button>
                                            }
                                            </>
                                            : "Your request for a quote is pending."
                                    }</>
                                    : <button
                                        className='button'
                                        onClick={() => setOpenRequestModal(true)}>
                                        Request a quote
                                    </button>
                            }
                        </div>
                    </>
            }

            <div className="box">
                {
                    messages.map(message => {
                        return <div key={message.id} className={
                            currentUserId === message.sender_id
                                ? "box has-background-info has-text-white"
                                : "box has-background-light"
                        }>
                            {message.body}
                        </div>
                    })
                }
                <MessageForm vendor={vendor} host={host} setMessages={setMessages} />
            </div>
        </>
    )
}