import { Link, useHistory } from "react-router-dom"



export default ({ contract }) => {
    const history = useHistory()
    const date = new Date(contract.host.date).toLocaleDateString()
    const time = new Date('1970-01-01T' + contract.host.time + 'Z').toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit', hour12: true})

    // {
    //     "id": 37,
    //     "vendor": {
    //         "id": 2,
    //         "user": {
    //             "id": 12,
    //             "username": "Nathaniel_Jones",
    //             "first_name": "Nathaniel",
    //             "last_name": "Jones"
    //         }
    //     },
    //     "host": {
    //         "id": 6,
    //         "wedding_size": {
    //             "id": 1,
    //             "min_guests": 0,
    //             "max_guests": 50,
    //             "label": "Small"
    //         },
    //         "date": "2022-01-06",
    //         "time": "02:27:27",
    //         "street_address": "6972 Jennifer Causeway Apt. 501",
    //         "city": "Kingsport",
    //         "state": "TN",
    //         "zip_code": "77051",
    //         "user": {
    //             "id": 6,
    //             "username": "John_Cruz",
    //             "first_name": "John",
    //             "last_name": "Cruz"
    //         },
    //         "profile_image": "/media/hostprofile/placeholder-1-e1533569576673-960x960.png"
    //     },
    //     "cost_per_hour": "91.69",
    //     "hired": true,
    //     "fired": false
    // },

    return (
        <Link to={`/contracts/${contract.id}`}>
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
