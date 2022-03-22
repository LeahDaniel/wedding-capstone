import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getCurrentHost, getHost } from "../../managers/HostManager"
import { ColorBlocks } from "./ColorBlock"
import { EditWedding } from "./EditWedding"
import { PhotoGallery } from "./PhotoGallery"

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
        if(host){
            const date = new Date(host.date).toLocaleDateString()
            const time = new Date('1970-01-01T' + host.time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
    
            setDate(date)
            setTime(time)
        }

    }, [host])

    return (
        <div className="is-flex is-justify-content-center is-flex-direction-column">
            <section className="column is-10 is-align-self-center">
                <EditWedding openEditModal={openEditModal} setOpenEditModal={setOpenEditModal} host={host} setHost={setHost} />
                <div className="mt-5 is-flex is-flex-direction-row is-justify-content-space-evenly">
                    <figure className="image is-300x300 mr-2">
                        <img className="is-rounded" src={`http://localhost:8000${host.profile_image}`} alt='user profile'></img>
                    </figure>

                    <h3 className=" ml-2 title has-text-centered is-align-self-center">
                        {host.user?.first_name} {host.user?.last_name}
                    </h3>
                </div>
            </section>
            <section className="columns mx-3 is-flex is-flex-wrap-wrap is-justify-content-center mt-3">
                <div className="column is-half" style={{ minWidth: 250}}>
                    <ColorBlocks isVendor={isVendor} hostId={hostId} />
                </div>
                <div className="column is-half" style={{ minWidth: 250}}>
                    <section className="card" style={{ height: 300}}>
                        <div className="card-content ">
                            <div className="subtitle has-text-centered mb-5 pb-3">Wedding Info </div>
                            <div >
                                <div >
                                    <div className="my-2"> {date} at {time} </div>
                                    <div className="my-2">
                                        {host.street_address}, {host.city}, {host.state} {host.zip_code}
                                    </div>
                                    <div className="my-2">Guest Count: {host.wedding_size?.label}</div>
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
                </div>
            </section>
            <div className="is-flex is-flex-direction-column is-justify-content-center mx-2">
                <PhotoGallery isVendor={isVendor} hostId={host.id} />
            </div>
        </div>
    )
}
