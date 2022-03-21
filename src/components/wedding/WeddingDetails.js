import React, { useState, useEffect } from "react"
import { getCurrentHost } from "../../managers/HostManager"
import { getHiredHostVendors } from "../../managers/HostVendorManager"
import {WeddingVendor} from "./WeddingVendor"

export const WeddingDetails = () => {
    const [hostVendors, setHostVendors] = useState([])
    const [host, setHost] = useState({})
    const [date, setDate] = useState("")
    const [time, setTime] = useState("")

    useEffect(() => {
        const date = new Date(host.date).toLocaleDateString()
        const time = new Date('1970-01-01T' + host.time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })

        setDate(date)
        setTime(time)
    }, [host])


    useEffect(() => {
        getHiredHostVendors().then(setHostVendors)
            .then(getCurrentHost).then(setHost)
    }, [])

    return (
        <div className="is-flex is-flex-direction-column is-justify-content-center">
            <div className="has-text-centered p-5">

                <h1 className="title py-1 m-0">Your Wedding</h1>
                <div className="py-1 is-size-5"> {date} at {time} </div>
                <div className="py-1 is-size-5">
                    {host.street_address}, {host.city}, {host.state} {host.zip_code}
                </div>
                <div className="py-1 is-size-5">Guest Count: {host.wedding_size?.label}</div>

            </div>
            <div  className="has-text-centered title is-size-4 py-1 m-0" >Your Vendors</div>
            <div>
                {
                    hostVendors.map(hostVendor => <WeddingVendor key={hostVendor.id} hostVendor={hostVendor} host={host} />)
                }
            </div>
        </div>
    )
}