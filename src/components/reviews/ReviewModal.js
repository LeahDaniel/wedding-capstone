import React, { useEffect, useRef } from "react"
import { createReview, editReview } from "../../managers/ReviewAndRatingManager"
import { getVendor } from "../../managers/VendorManager"

export default ({ openReviewModal, setOpenReviewModal, review, vendor, setVendor, setReview }) => {
    const reviewInput = useRef()

    useEffect(() => {
        if(review){
            reviewInput.current.value = review.body
        }
    }, [review])

    return (
        <>
            <div id="edit-modal" className={openReviewModal ? "modal is-active" : "modal"}>
                <div className="modal-background"></div>
                <div className="modal-content">
                    <div className="box">
                        <button className="delete" onClick={() => setOpenReviewModal(false)}></button>
                        <fieldset className="field mb-5">
                            <label className="label" htmlFor="review"> Your Review </label>
                            <div className="control">
                                <textarea className="textarea" ref={reviewInput} name="review" placeholder="Enter your review" required ></textarea>
                            </div>
                        </fieldset>
                        <button className="button" onClick={() => setOpenReviewModal(false)}>
                            Cancel
                        </button>
                        <button className="button" onClick={() => {
                            const newReview = {
                                vendor: vendor.id,
                                body: reviewInput.current.value
                            }

                            if(review){
                                editReview(review.id, newReview)
                                .then(() => getVendor(vendor.id))
                                .then(setVendor)
                                .then(() => setOpenReviewModal(false))
                            } else {
                                createReview(newReview)
                                .then((res) => {
                                    if(setReview){
                                        setReview(res)
                                    }
                                })
                                .then(() => getVendor(vendor.id))
                                .then((res) => {
                                    if(setVendor){
                                        setVendor(res)
                                    }
                                })
                                .then(() => setOpenReviewModal(false))
                            }
                        }}>
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}