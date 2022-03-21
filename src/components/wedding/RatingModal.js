import React, { useEffect, useState } from "react"
import StarPicker from "react-star-picker"
import { createRating, editRating } from "../../managers/ReviewAndRatingManager";

export const RatingModal = ({ openRatingModal, setOpenRatingModal, rating, vendor, setRating }) => {
    const [ratingInput, setRatingInput] = useState(null);

    useEffect(() => {
        if(rating){
            setRatingInput(rating.score)
        }
    }, [rating])

    return (
        <>
            <div id="edit-modal" className={openRatingModal ? "modal is-active" : "modal"}>
                <div className="modal-background"></div>
                <div className="modal-content">
                    <div className="box">
                        <button className="delete" onClick={() => setOpenRatingModal(false)}></button>
                        <fieldset className="field mb-5">
                            <label className="label" htmlFor="rating"> Your Rating </label>
                            <StarPicker value={ratingInput}
                                onChange={setRatingInput}/>
                        </fieldset>
                        <button className="button" onClick={() => setOpenRatingModal(false)}>
                            Cancel
                        </button>
                        <button className="button" onClick={() => {
                            const newRating = {
                                vendor: vendor.id,
                                score: ratingInput
                            }

                            if (rating) {
                                editRating(rating.id, newRating)
                                    .then(() => setOpenRatingModal(false))
                            } else {
                                createRating(newRating)
                                    .then(setRating)
                                    .then(() => setOpenRatingModal(false))
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