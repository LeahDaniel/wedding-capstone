import React, { useState } from "react"
import { deleteReview } from "../../managers/ReviewAndRatingManager"
import { getVendor } from "../../managers/VendorManager"
import {ReviewModal} from "./ReviewModal"


export const ReviewList = ({ setVendor, vendor, vendorReviews, host }) => {
    const [openReviewModal, setOpenReviewModal] = useState(false)
    const [currentReview, setCurrentReview] = useState({})

    return (
        <>
            <ReviewModal openReviewModal={openReviewModal} setOpenReviewModal={setOpenReviewModal}
                review={currentReview} vendor={vendor} setVendor={setVendor} />

            <div className="box">
                <div className="has-text-centered subtitle m-3 mb-5">Customer Reviews</div>
                {
                    vendorReviews.map(review => {
                        return <div key={review.id} className="message">
                            {
                                host.id === review.host.id
                                    ? <div className="message-header p-1 px-5">
                                        <button
                                            className="button p-2 py-0 m-0"
                                            onClick={() => {
                                                setCurrentReview(review)
                                                setOpenReviewModal(true)
                                            }}>Edit</button>
                                        <button
                                            className="delete"
                                            onClick={() => {
                                                deleteReview(review.id)
                                                    .then(() => getVendor(vendor.id))
                                                    .then(setVendor)
                                            }}></button>
                                    </div>
                                    : ""
                            }
                            <div className="has-text-right message-body">
                                <p>{review.body}</p>
                                <p>- {review.host.user.username}</p>
                            </div>
                        </div>
                    })
                }
            </div>
        </>
    )
}