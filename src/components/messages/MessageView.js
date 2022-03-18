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
        } else if (isVendor === false) {
            getVendorThreads().then(setThreads)
                .then(getCurrentHost).then((res) => setCurrentUserId(res.user.id))
        }
    }, [isVendor])

    return (
        <div className="is-flex is-justified-content-center is-flex-direction-column">
            <h1 className="subtitle">Your Message Threads</h1>
            <div>
                {
                    threads.map(thread => {
                        return <Link key={thread.id} to={isVendor ? `/messages/${thread.host.id}` : `/messages/${thread.vendor.id}`}>
                            <div className="box columns is-flex m-5">
                                {
                                    isVendor
                                        ? <p className="column is-3">{thread.host.user.username}</p>
                                        : <p className="column is-3">{thread.vendor.business_name}</p>
                                }
                                <div className="column is-2"></div>
                                <p className={
                                    currentUserId === thread.sender
                                        ? "box has-background-primary-light column is-6"
                                        : "box has-background-link-light column is-6"}>
                                    {thread.body}
                                </p>
                                <div className="column is-2"></div>
                            </div>
                        </Link>

                    })
                }
            </div>
        </div>
    )
}