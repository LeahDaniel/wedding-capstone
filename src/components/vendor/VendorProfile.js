import React, { useState, useEffect } from "react"
import StarPicker from "react-star-picker"
import { useParams } from "react-router-dom"
import { getCurrentVendor, getVendor } from "../../managers/VendorManager"
import EditVendor from "./EditVendor"
import MessageModal from "./MessageModal"
import { getCurrentHost } from "../../managers/HostManager"
import { getHostVendorByStakeholders } from "../../managers/HostVendorManager"
import HireModal from "../messages/HireModal"
import RequestModal from "../messages/RequestModal"
import FireModal from "../messages/FireModal"

export default ({ isVendor }) => {
    const { vendorId } = useParams()
    const [vendor, setVendor] = useState({})
    const [host, setHost] = useState({})
    const [hostVendor, setHostVendor] = useState(null)
    const [openEditModal, setOpenEditModal] = useState(false)
    const [openMessageModal, setOpenMessageModal] = useState(false)
    const [openRequestModal, setOpenRequestModal] = useState(false)
    const [openHireModal, setOpenHireModal] = useState(false)
    const [openFireModal, setOpenFireModal] = useState(false)


    useEffect(() => {
        if (isVendor) {
            getCurrentVendor().then(setVendor)
        } else {
            getVendor(vendorId).then(setVendor)
                .then(getCurrentHost).then(setHost)
        }
    }, [isVendor, vendorId])

    useEffect(() => {
        if (!isVendor && host.id && vendor.id) {
            getHostVendorByStakeholders(host.id, vendor.id)
                .then((res) => {
                    if (res.found === false) {
                        setHostVendor(null)
                    } else {
                        setHostVendor(res)
                    }
                })
        }
    }, [isVendor, host, vendor])

    return (
        <div className="p-5">
            <HireModal openHireModal={openHireModal} setOpenHireModal={setOpenHireModal}
                hostVendor={hostVendor} setHostVendor={setHostVendor}
                host={host} vendor={vendor} />
            <RequestModal openRequestModal={openRequestModal} setOpenRequestModal={setOpenRequestModal}
                hostVendor={hostVendor} setHostVendor={setHostVendor}
                host={host} vendor={vendor} />
            <FireModal openFireModal={openFireModal} setOpenFireModal={setOpenFireModal}
                hostVendor={hostVendor} setHostVendor={setHostVendor}
                host={host} vendor={vendor} />
            <EditVendor openEditModal={openEditModal} setOpenEditModal={setOpenEditModal}
                vendor={vendor} setVendor={setVendor} />
            <MessageModal openMessageModal={openMessageModal} setOpenMessageModal={setOpenMessageModal}
                vendor={vendor} />

            <img src={`http://localhost:8000${vendor.profile_image}`} />
            <h1 className="subtitle">{vendor.business_name}</h1>
            {
                isVendor
                    ? <button className="button" onClick={() => setOpenEditModal(true)}>Edit Business</button>
                    : <button className="button" onClick={() => setOpenMessageModal(true)}>Message</button>
            }
            {
                hostVendor
                    ? <>{
                        hostVendor.cost_per_hour
                            ? <>{
                                hostVendor.hired
                                    ? <>{
                                        hostVendor.fired
                                            ? ""
                                            : <button
                                                className="button"
                                                onClick={() => setOpenFireModal(true)}>
                                                Fire Vendor
                                            </button>
                                    }</>
                                    : <button
                                        className="button"
                                        onClick={() => setOpenHireModal(true)}>
                                        Accept Quote and Hire
                                    </button>
                            }
                            </>
                            : ""
                    }</>
                    : <button
                        className='button'
                        onClick={() => setOpenRequestModal(true)}>
                        Request a quote
                    </button>
            }

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