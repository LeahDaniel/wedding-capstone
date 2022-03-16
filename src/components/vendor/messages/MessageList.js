import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { getCurrentVendor, getHost, getHostVendor, getHostVendorByStakeholders, getMessages } from "../VendorManager"
import DenyModal from "./DenyModal"
import MessageForm from "./MessageForm"
import QuitModal from "./QuitModal"
import QuoteModal from "./QuoteModal"

export default () => {
    const { hostId } = useParams()
    const [host, setHost] = useState({})
    const [vendor, setVendor] = useState({})
    const [hostVendor, setHostVendor] = useState(null)
    const [messages, setMessages] = useState([])
    const [openQuitModal, setOpenQuitModal] = useState(false)
    const [openDenyModal, setOpenDenyModal] = useState(false)
    const [openQuoteModal, setOpenQuoteModal] = useState(false)

    useEffect(() => {
        getHost(hostId)
            .then(setHost)
            .then(getCurrentVendor)
            .then(setVendor)
    }, [hostId])

    useEffect(() => {
        if (host.id && vendor.id) {
            getHostVendorByStakeholders(host.id, vendor.id)
                .then((res) => {
                    if(res.found === false){
                        setHostVendor(null)
                    }else{
                        setHostVendor(res)
                    }
                })
                .then(() => getMessages(host.id, vendor.id))
                .then(setMessages)
        }
    }, [host, vendor])

    return (
        <>
            <DenyModal openDenyModal={openDenyModal} setOpenDenyModal={setOpenDenyModal}
                hostVendor={hostVendor} setHostVendor={setHostVendor} 
                host={host} vendor={vendor} setMessages={setMessages}/>
            <QuitModal openQuitModal={openQuitModal} setOpenQuitModal={setOpenQuitModal}
                hostVendor={hostVendor} setHostVendor={setHostVendor} 
                host={host} vendor={vendor} setMessages={setMessages}/>
            <QuoteModal openQuoteModal={openQuoteModal} setOpenQuoteModal={setOpenQuoteModal}
                hostVendor={hostVendor} setHostVendor={setHostVendor} 
                host={host} vendor={vendor} setMessages={setMessages}/>

            <h1 className="subtitle">Messages with {host.user?.first_name}</h1>

            <div id="button-controller">
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

            <div className="box">
                {
                    messages.map(message => {
                        return <div key={message.id} className={
                            vendor.user.id === message.sender_id
                                ? "box has-background-info has-text-white"
                                : "box has-background-light"}>
                            {message.body}
                        </div>
                    })
                }
                <MessageForm vendor={vendor} host={host} setMessages={setMessages} />
            </div>
        </>
    )
}

