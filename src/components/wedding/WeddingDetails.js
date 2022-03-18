import React, { useState, useEffect } from "react"
import { getCurrentHost } from "../../managers/HostManager"
import { getHiredHostVendors} from "../../managers/HostVendorManager"
import WeddingVendor from "./WeddingVendor"

export default () => {
    const [hostVendors, setHostVendors] = useState([])
    const [host, setHost] = useState({})

    const date = new Date(host.date).toLocaleDateString()
    const time = new Date('1970-01-01T' + host.time).toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit', hour12: true})

    useEffect(() => {
        getHiredHostVendors().then(setHostVendors)
            .then(getCurrentHost).then(setHost)
    }, [])

    return (
        <>
            <h1 className="subtitle">Your Wedding</h1>
            <div>Wedding Info </div>
            <div> {date} at {time} </div>
            <div>
                <p>
                    {host.street_address}
                </p>
                <p>
                    {host.city}, {host.state} {host.zip_code}
                </p>
            </div>
            <div>Guest Count: {host.wedding_size?.label}</div>
            <div>Your Vendors</div>
            <div>
                {
                    hostVendors.map(hostVendor => <WeddingVendor key={hostVendor.id} hostVendor={hostVendor} host={host}/>)
                }
            </div>
        </>
    )
}