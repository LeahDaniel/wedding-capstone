import React, { useState, useEffect } from "react"
import StarPicker from "react-star-picker"
import { useParams } from "react-router-dom"
import { getCurrentVendor, getVendor } from "../../managers/VendorManager"
import EditVendor from "./EditVendor"
import MessageModal from "./MessageModal"

export default ({isVendor}) => {
    const { vendorId } = useParams()
    const [vendor, setVendor] = useState({})
    const [openEditModal, setOpenEditModal] = useState(false)
    const [openMessageModal, setOpenMessageModal] = useState(false)

    useEffect(() => {
        if(isVendor){
            getCurrentVendor().then(setVendor)
        } else {
            getVendor(vendorId).then(setVendor)
        }
    }, [])

    return (
        <div className="p-5">
            <img src={`http://localhost:8000${vendor.profile_image}`}/>
            <h1 className="subtitle">{vendor.business_name}</h1>
            {
                isVendor
                ? <button className="button" onClick={() => setOpenEditModal(true)}>Edit Business</button>
                : <button className="button" onClick={() => setOpenMessageModal(true)}>Message</button>
            }
            
            <EditVendor openEditModal={openEditModal} setOpenEditModal={setOpenEditModal}
                vendor={vendor} setVendor={setVendor} />
            <MessageModal openMessageModal={openMessageModal} setOpenMessageModal={setOpenMessageModal}
                vendor={vendor} />
            <StarPicker value={vendor.average_rating} disabled={true} halfStars />
            <div>
                Category: {vendor.vendor_type?.label}
            </div>
            <div>
                Years in business: {vendor.years_in_business}
            </div>
            <div>
                Avg cost per hr: ${vendor.average_cost}
            </div>
            <div>
                Number times hired: {vendor.total_hired_count}
            </div>
            <div>
                Description: {vendor.description}
            </div>
            <div className="box">
                Customer Reviews
                {
                    vendor.vendor_reviews?.map(review => {
                        return <div key={review.id} className="message">
                            {review.body}
                            <p>- {review.host.user.username}</p>
                        </div>
                    })
                }
            </div>
        </div>
    )
}