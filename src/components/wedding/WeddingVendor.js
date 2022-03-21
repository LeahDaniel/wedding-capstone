import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getRating, getReview } from "../../managers/ReviewAndRatingManager"
import {ReviewModal} from "../reviews/ReviewModal"
import { RatingModal} from "./RatingModal"

export const WeddingVendor = ({ hostVendor, host }) => {
    const [openReviewModal, setOpenReviewModal] = useState(false)
    const [openRatingModal, setOpenRatingModal] = useState(false)
    const [rating, setRating] = useState(null)
    const [review, setReview] = useState(null)

    useEffect(() => {
        getRating(hostVendor.vendor.id)
            .then((res) => {
                if (res.found === false) {
                    setRating(null)
                } else {
                    setRating(res)
                }
            })
            .then(() => getReview(hostVendor.vendor.id))
            .then((res) => {
                if (res.found === false) {
                    setReview(null)
                } else {
                    setReview(res)
                }
            })
    }, [hostVendor])

    return (
        <div className="m-3 columns is-flex is-justify-content-center">
            <ReviewModal openReviewModal={openReviewModal}
                setOpenReviewModal={setOpenReviewModal}
                vendor={hostVendor.vendor} review={review} setReview={setReview} />
            <RatingModal openRatingModal={openRatingModal}
                setOpenRatingModal={setOpenRatingModal}
                vendor={hostVendor.vendor} rating={rating} setRating={setRating} />
            <div className="card m-3 column is-two-thirds">
                <div className="card-content">
                    <div className="media">
                        <div className="media-left">
                            <figure className="image is-128x128">
                                <img src={`http://localhost:8000${hostVendor.vendor.profile_image}`} alt="vendor profile" />
                            </figure>
                        </div>
                        <div className="media-content is-flex is-flex-direction-column is-align-self-center column is-two-thirds ml-auto mr-auto">
                            <Link to={`/vendors/${hostVendor.vendor.id}`}>
                                <h1 className="title is-size-4 m-2 ml-3 p-0">{hostVendor.vendor.business_name}</h1>
                            </Link>
                            <div className="is-size-5 p-0 m-2 ml-3">
                                Cost per hour: ${hostVendor.cost_per_hour}
                            </div>
                        </div>
                    </div>
                    <div className="m-3 columns is-flex is-justify-content-center">
                        {
                            host.has_happened
                                ? <>{
                                    review
                                        ? <button
                                            className="button mx-3"
                                            onClick={() => {
                                                setOpenReviewModal(true)
                                            }}>Update Review</button>

                                        : <button
                                            className="button mx-3"
                                            onClick={() => {
                                                setOpenReviewModal(true)
                                            }}>Review</button>

                                }{
                                        rating
                                            ? <button
                                                className="button mx-3"
                                                onClick={() => {
                                                    setOpenRatingModal(true)
                                                }}> Update Rating</button>

                                            : <button
                                                className="button mx-3"
                                                onClick={() => {
                                                    setOpenRatingModal(true)
                                                }}>Rate</button>
                                    }
                                </>

                                : ""
                        }
                    </div>
                </div>
            </div>
        </div>


    )
}