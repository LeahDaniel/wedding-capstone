import React, { useState, useEffect } from "react"
import { getVendorTypes } from "../auth/AuthManager"
import { useHistory } from "react-router-dom"

export default () => {
    const history = useHistory()
    const [vendorTypes, setVendorTypes] = useState([])

    useEffect(() => {
        getVendorTypes().then(setVendorTypes)
    }, [])

    return (
        <>
            <h1 className="subtitle">Choose a Vendor Type</h1>
            <div>
                {
                    vendorTypes.map(vendorType => {
                        return <div
                            key={vendorType.id}
                            className="box button"
                            onClick={() => history.push(`/vendors/type/${vendorType.id}`)}>
                            {vendorType.label}
                        </div>
                    })
                }
            </div>
        </>
    )
}