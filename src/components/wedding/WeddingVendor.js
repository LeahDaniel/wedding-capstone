import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import StarPicker from "react-star-picker"
import { getRating, getReview } from "../../managers/ReviewAndRatingManager"
import ReviewModal from "../reviews/ReviewModal"
import RatingModal from "./RatingModal"

export default ({ hostVendor, host }) => {
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
    }, [])

    return (
        <>
            <ReviewModal openReviewModal={openReviewModal}
                setOpenReviewModal={setOpenReviewModal}
                vendor={hostVendor.vendor} review={review} setReview={setReview}/>
            <RatingModal openRatingModal={openRatingModal}
                setOpenRatingModal={setOpenRatingModal}
                vendor={hostVendor.vendor} rating={rating} setRating={setRating}/>
            <div className="card m-3">
                <img src={`http://localhost:8000${hostVendor.vendor.profile_image}`} />
                <Link to={`/vendors/${hostVendor.vendor.id}`}>
                    <h1 className="subtitle">{hostVendor.vendor.business_name}</h1>
                </Link>
                <div>
                    Cost per hour: ${hostVendor.cost_per_hour}
                </div>
                {
                    host.has_happened
                        ? <>{
                            review
                                ? <button
                                    className="button"
                                    onClick={() => {
                                        setOpenReviewModal(true)
                                    }}>Update Review</button>

                                : <button
                                    className="button"
                                    onClick={() => {
                                        setOpenReviewModal(true)
                                    }}>Review</button>

                        }{
                                rating
                                    ? <button
                                        className="button"
                                        onClick={() => {
                                            setOpenRatingModal(true)
                                        }}> Update Rating</button>

                                    : <button
                                        className="button"
                                        onClick={() => {
                                            setOpenRatingModal(true)
                                        }}>Rate</button>
                            }
                        </>

                        : ""
                }
            </div>
        </>


    )
}