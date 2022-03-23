import React, { useState, useEffect } from "react"
import StarPicker from "react-star-picker"
import { useParams } from "react-router-dom"
import { getCurrentVendor, getVendor } from "../../managers/VendorManager"
import {EditVendor} from "./EditVendor"
import {MessageModal} from "../messages/MessageModal"
import { getCurrentHost } from "../../managers/HostManager"
import { getHostVendorByStakeholders } from "../../managers/HostVendorManager"
import {HireModal} from "../messages/HireModal"
import {RequestModal} from "../messages/RequestModal"
import {FireModal} from "../messages/FireModal"
import {ReviewList} from "../reviews/ReviewList"
import { Slideshow } from "./Slideshow"

export const VendorProfile = ({ isVendor }) => {
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
        } else if (isVendor === false) {
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
        <div className="is-flex is-justify-content-center">

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
            <div className="column is-10 card p-5">

                <div className="card-content">
                    <div className="media">
                        <div className="media-left mx-5 image is-160x160">
                            <img className="is-rounded" src={`http://localhost:8000${vendor.profile_image}`} alt="vendor profile"/>
                        </div>
                        <div className="media-content mx-5 px-5 ">
                            <h1 className="title py-1 m-0">{vendor.business_name}</h1>
                            <StarPicker className="py-1" value={vendor.average_rating} disabled={true} halfStars />
                            <div className="py-1 is-size-5">
                                Category: {vendor.vendor_type?.label}
                            </div>
                            <div className="py-1 is-size-5">
                                Years in business: {vendor.years_in_business}
                            </div>
                            {
                                vendor.average_cost
                                    ? <div className="py-1 is-size-5">
                                        Avg $/hr: {vendor.average_cost}
                                    </div>
                                    : ""
                            }
                            <div className="py-1 is-size-5">
                                Total customers: {vendor.total_hired_count}
                            </div>
                        </div>
                    </div>
                    <div className="box">
                        {vendor.description}
                    </div>
                    <div className="is-flex is-justify-content-center ">

                        {
                            isVendor
                                ? <button className="button mx-4" onClick={() => setOpenEditModal(true)}>Edit Business</button>
                                : <>
                                    <button className="button mx-4" onClick={() => setOpenMessageModal(true)}>Message</button>
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
                                                className='button mx-4'
                                                onClick={() => setOpenRequestModal(true)}>
                                                Request a quote
                                            </button>
                                    }
                                </>
                        }
                    </div>
                    <Slideshow isVendor={isVendor} vendorId={vendor.id}/>

                </div>
                {
                    vendor.vendor_reviews?.length > 0
                        ? <ReviewList vendor={vendor} setVendor={setVendor} vendorReviews={vendor.vendor_reviews} host={host} />
                        : ""
                }

            </div>
        </div>
    )
}