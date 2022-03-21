import { Link } from "react-router-dom"
import StarPicker from "react-star-picker"

export const Vendor = ({ vendor }) => {
    return (
        <Link className="m-3 columns is-flex is-justify-content-center" to={`/vendors/${vendor.id}`}>
            <div className="card m-3 column is-half">
                <div className="card-content">
                    <div className="media">
                        <div className="media-left">
                            <figure className="image is-128x128">
                                <img className="image" src={`http://localhost:8000${vendor.profile_image}`} alt="vendor profile"/>
                            </figure>
                        </div>
                        <div className="media-content">
                            <p className="title is-size-4 m-2 ml-3 p-0">{vendor.business_name}</p>
                            <StarPicker className="m-2"value={vendor.average_rating} disabled={true} halfStars />

                            {
                                vendor.average_cost
                                    ? <div className="is-size-5 p-0 m-2 ml-3">
                                        Avg $/hr: {vendor.average_cost}
                                    </div>
                                    : ""
                            }
                        </div>
                    </div>


                </div>
            </div>

        </Link>
    )
}