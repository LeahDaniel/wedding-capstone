import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getCurrentHost, getHost } from "../../managers/HostManager"

export default ({ isHost, isVendor }) => {
    const { hostId } = useParams()
    const [host, setHost] = useState({})
    const date = new Date(host.date).toLocaleDateString()
    const time = new Date('1970-01-01T' + host.time + 'Z').toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })

    useEffect(() => {
        if (isVendor) {
            getHost(hostId).then(setHost)
        } else if (isHost) {
            getCurrentHost().then(setHost)
        }
    }, [isHost, isVendor])

    return (
        <section >
            <div >
                <img src={`http://localhost:8000${host.profile_image}`} alt='user profile image'></img>
                <h3 >
                    {host.user?.username}
                </h3>
            </div>
            <section >
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
            </section>
        </section>
    )
}