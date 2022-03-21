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
        <>
            <h1 className="subtitle has-text-centered mt-5 pt-5">Choose a Vendor Type</h1>
            <div className="is-flex-wrap-wrap columns">
                {
                    vendorTypes.map(vendorType => {
                        return <div
                            key={vendorType.id}
                            className="column is-2 m-4 py-5 has-text-centered is-clickable box"
                            onClick={() => history.push(`/vendors/type/${vendorType.id}`)}>
                            {vendorType.label}
                        </div>
                    })
                }
            </div>
        </>
    )
}