import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { getCurrentHost } from "../../managers/HostManager"
import { getHostThreads, getVendorThreads } from "../../managers/MessageManager"
import { getCurrentVendor } from "../../managers/VendorManager"

export default ({ isVendor }) => {
    const [threads, setThreads] = useState([])
    const [currentUserId, setCurrentUserId] = useState(null)

    useEffect(() => {
        if (isVendor) {
            getHostThreads().then(setThreads)
                .then(getCurrentVendor).then((res) => setCurrentUserId(res.user.id))
        } else {
            getVendorThreads().then(setThreads)
                .then(getCurrentHost).then((res) => setCurrentUserId(res.user.id))
        }
    }, [isVendor])

    return (
        <>
            <h1 className="subtitle">Your Message Threads</h1>
            <div>
                {
                    threads.map(thread => {
                        return <Link key={thread.id} to={isVendor ? `/messages/${thread.host.id}` : `/messages/${thread.vendor.id}`}>
                            <div className="box">
                                {
                                    isVendor
                                        ? <p>{thread.host.user.username}</p>
                                        : <p>{thread.vendor.business_name}</p>
                                }
                                <p className={
                                    currentUserId === thread.sender
                                        ? "box has-background-primary-light"
                                        : "box has-background-link-light"}>
                                    Most recent message: {thread.body}
                                </p>
                            </div>
                        </Link>

                    })
                }
            </div>
        </>
    )
}