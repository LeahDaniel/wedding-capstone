import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { getCurrentHost } from "../../managers/HostManager"
import { getHostThreads, getVendorThreads } from "../../managers/MessageManager"
import { getCurrentVendor } from "../../managers/VendorManager"

export default ({ isVendor, isHost }) => {
    const [threads, setThreads] = useState([])
    const [currentUserId, setCurrentUserId] = useState(null)

    useEffect(() => {
        if (isVendor) {
            getHostThreads().then(setThreads)
                .then(getCurrentVendor).then((res) => setCurrentUserId(res.user.id))
        } else if (isHost) {
            getVendorThreads().then(setThreads)
                .then(getCurrentHost).then((res) => setCurrentUserId(res.user.id))
        }
    }, [isHost, isVendor])

    return (
        <>
            <h1 className="subtitle">Your Message Threads</h1>
            <div>
                {
                    threads.map(thread => {
                        return <div className="box" key={thread.id}>
                            {
                                isVendor
                                    ? <Link to={`/hosts/${thread.host.id}`}>
                                        <p>{thread.host.user.username}</p>
                                    </Link>
                                    : ""
                            }
                            {
                                isHost
                                    ? <Link to={`/vendors/${thread.vendor.id}`}>
                                        <p>{thread.vendor.business_name}</p>
                                    </Link>
                                    : ""
                            }

                            <Link to={`/messages/${thread.host.id}`}>
                                <p className={
                                    currentUserId === thread.sender
                                        ? "box has-background-primary-light"
                                        : "box has-background-link-light"}>
                                    Most recent message: {thread.body}
                                </p>
                            </Link>
                        </div>

                    })
                }
            </div>
        </>
    )
}