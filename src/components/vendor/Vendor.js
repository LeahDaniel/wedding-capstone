import { Link } from "react-router-dom"

export default ({vendor}) => {
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