import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { getCurrentHost } from "../../managers/HostManager"
import { getHostThreads, getVendorThreads } from "../../managers/MessageManager"
import { getCurrentVendor } from "../../managers/VendorManager"

export const MessageView = ({ isVendor }) => {
    const [threads, setThreads] = useState([])
    const [currentUserId, setCurrentUserId] = useState(null)

    useEffect(() => {
        const reloadResources = () => {
            if (isVendor) {
                getHostThreads().then(setThreads)
                    .then(getCurrentVendor).then((res) => setCurrentUserId(res.user.id))
            } else if (isVendor === false) {
                getVendorThreads().then(setThreads)
                    .then(getCurrentHost).then((res) => setCurrentUserId(res.user.id))
            }
        }

        reloadResources()
        const interval = setInterval(() => reloadResources(), 8000)
        return () => {
            clearInterval(interval);
        }

    }, [isVendor])

    return (
        <div className="is-flex is-justified-content-center is-flex-direction-column">
            <h1 className="is-size-4 has-text-centered mt-5">Your Message Threads</h1>
            <div>
                {
                    threads.map(thread => {
                        return <Link key={thread.id} to={isVendor ? `/messages/${thread.host.id}` : `/messages/${thread.vendor.id}`}>
                            <div className="box columns is-flex m-5">
                                {
                                    isVendor
                                        ? <p className="column is-3 ml-2 is-size-5">{thread.host.user.username}</p>
                                        : <p className="column is-3 ml-2 is-size-5">{thread.vendor.business_name}</p>
                                }
                                <div className="column is-2"></div>
                                <p className={
                                    currentUserId === thread.sender
                                        ? "box has-background-primary-light column is-6 has-text-right"
                                        : "box has-background-link-light column is-6 has-text-left"}>
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