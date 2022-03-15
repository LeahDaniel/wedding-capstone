import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { getCurrentVendor, getHost, getHostVendor, getMessages } from "../VendorManager"
import ContractController from "./ContractController"
import MessageForm from "./MessageForm"

export default () => {
    const { hostId } = useParams()
    const [host, setHost] = useState({})
    const [vendor, setVendor] = useState({})
    const [hostVendor, setHostVendor] = useState(null)
    const [messages, setMessages] = useState([])

    useEffect(() => {
        getHost(hostId)
            .then(setHost)
            .then(getCurrentVendor)
            .then(setVendor)
    }, [hostId])

    useEffect(() => {
        if (host.id && vendor.id) {
            getHostVendor(host.id, vendor.id)
                .then(setHostVendor)
                .then(() => getMessages(host.id, vendor.id))
                .then(setMessages)
        }
    }, [host, vendor])

    return (
        <>
            <h1 className="subtitle">Messages with {host.user?.first_name}</h1>
            <ContractController hostVendor={hostVendor} setHostVendor={setHostVendor}/>
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
                <MessageForm vendor={vendor} host={host} setMessages={setMessages}/>
            </div>
        </>
    )
}

