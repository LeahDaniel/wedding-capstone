import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getHost } from "../VendorManager"

export default () => {
    const {hostId} = useParams()
    const [host, setHost] = useState({})
    const date = new Date(host.date).toLocaleDateString()
    const time = new Date('1970-01-01T' + host.time + 'Z').toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })

    useEffect(() => {
        getHost(hostId).then(setHost)
    }, [])

    return (
        <section >
            <div >
                <img src={`http://localhost:8000${host.profile_image}`} alt='user profile image'></img>
                <h3 >
                    {host.user?.first_name} {host.user?.last_name}
                </h3>
            </div>
            <section >
                <div>Their Wedding</div>
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
            </section>
        </section>
    )
}