import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { getHostThreads } from "../../../managers/MessageManager"
import { getCurrentVendor } from "../../../managers/VendorManager"

export default () => {
    const [threads, setThreads] = useState([])
    const [currentUserId, setCurrentUserId] = useState(null)

    useEffect(() => {
        getHostThreads().then(setThreads)
            .then(getCurrentVendor).then((res) => setCurrentUserId(res.user.id))
    }, [])

    return (
        <>
            <h1 className="subtitle">Your Message Threads</h1>
            <div>
                {
                    threads.map(thread => {
                        return <div className="box" key={thread.id}>
                            <Link to={`/hosts/${thread.host.id}`}>
                                <p>{thread.host.user.username}</p>
                            </Link>
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