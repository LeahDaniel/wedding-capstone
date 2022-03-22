import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getCurrentHost, getHost } from "../../managers/HostManager"
import { ColorBlocks } from "./ColorBlock"
import {EditWedding} from "./EditWedding"

export const HostProfile = ({ isVendor }) => {
    const { hostId } = useParams()
    const [host, setHost] = useState({})
    const [openEditModal, setOpenEditModal] = useState(false)
    const [date, setDate] = useState("")
    const [time, setTime] = useState("")
    

    useEffect(() => {
        if (isVendor) {
            getHost(hostId).then(setHost)
        } else if (isVendor === false) {
            getCurrentHost().then(setHost)
        }
    }, [isVendor, hostId])

    useEffect(() => {
        const date = new Date(host.date).toLocaleDateString()
        const time = new Date('1970-01-01T' + host.time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })

        setDate(date)
        setTime(time)

    }, [host])

    return (
        <section className="is-flex is-flex-direction-row is-justify-content-space-evenly mt-5 pt-5 columns">
            <EditWedding openEditModal={openEditModal} setOpenEditModal={setOpenEditModal} host={host} setHost={setHost} />
            <figure className="image is-300x300 mt-5 pt-5">
                <img className="is-rounded" src={`http://localhost:8000${host.profile_image}`} alt='user profile'></img>
            </figure>
            <div className="mt-5 pt-5">
                <h3 className="title has-text-centered">
                    {host.user?.first_name} {host.user?.last_name}
                </h3>
                <section className="card">
                    <div className="card-content ">
                        <div className="subtitle has-text-centered ">Wedding Info </div>
                        <div >
                            <div >
                                <div> {date} at {time} </div>
                                <div>
                                    {host.street_address}, {host.city}, {host.state} {host.zip_code}
                                </div>
                                <div>Guest Count: {host.wedding_size?.label}</div>
                            </div>
                        </div>
                        <div className="is-flex is-justify-content-center ">
                            {
                                isVendor
                                    ? ""
                                    : <button className="button mt-5 " onClick={() => setOpenEditModal(true)}>Edit</button>
                            }
                        </div>
                    </div>
                </section>
                <ColorBlocks isVendor={isVendor} hostId={hostId}/>
            </div>
        </section>
    )
}
