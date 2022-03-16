import { Link } from "react-router-dom"

export default ({ contract }) => {
    const date = new Date(contract.host.date).toLocaleDateString()
    const time = new Date('1970-01-01T' + contract.host.time + 'Z').toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit', hour12: true})

    return (
        <Link to={`/hosts/${contract.host.id}`}>
            <section className="message is-info m-5">
                <div className="card-header">
                    <img src={`http://localhost:8000${contract.host.profile_image}`} alt='user profile image'></img>
                    <h3 className="message-header">
                        {contract.host.user.first_name} {contract.host.user.last_name}'s Wedding
                    </h3>
                </div>
                <section className="message-body">
                    <div> {date} at {time} </div>
                    <div>
                        <p>
                           {contract.host.street_address}
                        </p>
                        <p>
                            {contract.host.city}, {contract.host.state} {contract.host.zip_code}
                        </p>
                    </div>
                    <div>Guest Count: {contract.host.wedding_size.label}</div>
                    <div>Charging {contract.cost_per_hour}/hr</div>
                </section>
            </section>
        </Link>
    )
}
