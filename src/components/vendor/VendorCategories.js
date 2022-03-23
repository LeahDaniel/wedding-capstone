import React, { useState, useEffect } from "react"
import { getVendorTypes } from "../auth/AuthManager"
import { useHistory } from "react-router-dom"

export const VendorCategories = () => {
    const history = useHistory()
    const [vendorTypes, setVendorTypes] = useState([])

    useEffect(() => {
        getVendorTypes().then(setVendorTypes)
    }, [])

    return (
        <div className="container is-flex is-flex-direction-column">
            <h1 className="subtitle has-text-centered mt-5 pt-5">Choose a Vendor Type</h1>
            <div className="is-flex is-flex-wrap-wrap column is-10 is-justify-content-center is-align-self-center">
                {
                    vendorTypes.map(vendorType => {
                        return <div
                            key={vendorType.id}
                            className="is-clickable cat-image-container"
                            onClick={() => history.push(`/vendors/type/${vendorType.id}`)}>
                            <div className="cat-image-label has-text-centered">
                                <div className="title is-size-5">{vendorType.label}</div>
                            </div>
                            <figure className="image" style={{width:250}}>
                                <img className="cat-image is-rounded" src={`http://localhost:8000${vendorType.image}`} alt="category" />
                            </figure>
                        </div>
                    })
                }
            </div>
        </div>
    )
}