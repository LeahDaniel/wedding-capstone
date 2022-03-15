import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { getCurrentVendor, getHostThreads } from "../VendorManager"

export default () => {
    const [threads, setThreads] = useState([])
    const [currentUserId, setCurrentUserId] = useState(null)

    useEffect(() => {
        getHostThreads().then(setThreads)
            .then(getCurrentVendor).then((res) => setCurrentUserId(res.vendor?.user.id))
    }, [])

    return (
        <>
            <h1 className="subtitle">Your Message Threads</h1>
            <div>
                {
                    threads.map(thread => {
                        return <Link
                            key={thread.id}
                            to={`/messages/${thread.host.id}`}
                        >
                            <div className="box" >
                                <p>{thread.host.user.first_name} {thread.host.user.last_name}</p>
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