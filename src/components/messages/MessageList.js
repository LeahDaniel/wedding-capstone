import React, { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { getCurrentHost, getHost } from "../../managers/HostManager"
import { getHostVendorByStakeholders } from "../../managers/HostVendorManager"
import { getMessages } from "../../managers/MessageManager"
import { getCurrentVendor, getVendor } from "../../managers/VendorManager"
import { HireModal } from "./HireModal"
import { MessageForm } from "./MessageForm"
import { RequestModal } from "./RequestModal"
import { FireModal } from "./FireModal"
import { DenyModal } from "./DenyModal"
import { QuitModal } from "./QuitModal"
import { QuoteModal } from "./QuoteModal"

export const MessageList = ({ isVendor }) => {
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

        } else if (isVendor === false) {
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
        const reloadResources = () => {
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

        if (host.id && vendor.id) {
            reloadResources()
            const interval = setInterval(() => reloadResources(), 5000)
            return () => {
                clearInterval(interval);
            }
        }
    }, [host, vendor])

    return (
        <div className="is-flex has-text-centered is-justified-content-center is-flex-direction-column">
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

                        <h1 className="is-size-3 m-4"> Messages with {<Link to={`/hosts/${host.id}`}>{host.user?.username}</Link>}</h1>


                        <div id="button-controller-vendor" className="mb-5">
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
                                                    className="button mx-1"
                                                    onClick={() => setOpenQuoteModal(true)}>
                                                    Send a Quote
                                                </button>
                                                <button
                                                    className="button mx-1"
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

                        <h1 className="is-size-3 m-4">Messages with  <Link to={`/vendors/${vendor.id}`}>{vendor.business_name}</Link></h1>

                        <div id="button-controller-host" className="mb-5">
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

            <div className="box column is-10 is-flex is-align-self-center is-flex-direction-column">
                {
                    messages.map(message => {
                        return <div key={message.id} className={
                            currentUserId === message.sender_id
                                ? "box has-background-info is-align-self-flex-end has-text-white has-text-left column is-4 mr-5"
                                : "box has-background-light  is-align-self-flex-start has-text-left column is-4 ml-5"
                        }>
                            {message.body}
                        </div>
                    })
                }
                <MessageForm vendor={vendor} host={host} setMessages={setMessages} />
            </div>
        </div>
    )
}