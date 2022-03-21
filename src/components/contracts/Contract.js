import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export const Contract = ({ contract }) => {
    const [date, setDate] = useState("")
    const [time, setTime] = useState("")

    useEffect(() => {
        const date = new Date(contract.host.date).toLocaleDateString()
        const time = new Date('1970-01-01T' + contract.host.time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })

        setDate(date)
        setTime(time)
    }, [contract])
    
    return (
        <Link className="m-3 columns is-flex is-justify-content-center" to={`/hosts/${contract.host.id}`}>
            <section className="card m-3 column is-half">
                <div className="media p-0 m-0">
                    <div className="media-left">
                        <figure className="image is-128x128">
                            <img className="is-rounded" src={`http://localhost:8000${contract.host.profile_image}`} alt='user profile'></img>
                        </figure>
                    </div>
                    <h3 className="media-content is-flex is-flex-direction-column is-align-self-center column is-two-thirds ml-auto mr-auto">
                        <p className="title is-size-4 m-2 ml-3 p-0">
                            {contract.host.user.first_name} {contract.host.user.last_name}'s Wedding
                        </p>
                    </h3>
                </div>
                <section className="card-content p-0 is-flex is-flex-direction-column is-align-self-center column is-10 ml-auto mr-auto has-text-centered">
                    <div> {date} at {time} </div>
                    <div>
                        {contract.host.street_address}, {contract.host.city}, {contract.host.state} {contract.host.zip_code}
                    </div>
                    <div>Guest Count: {contract.host.wedding_size.label}</div>
                    <div>Charging {contract.cost_per_hour}/hr</div>
                </section>
            </section>
        </Link>
    )
}
