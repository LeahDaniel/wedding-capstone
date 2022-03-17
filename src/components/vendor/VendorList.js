import React, { useState, useEffect } from "react"
import { getCurrentVendor } from "../../managers/VendorManager"
import Vendor from "./Vendor"

export const VendorList = () => {
    const [vendors, setVendors] = useState([])

    useEffect(() => {
        getCurrentVendor().then(setVendor)
    }, [])

    return (
        <>
            <h1 className="subtitle">Your Upcoming Events</h1>
            <div>
                {
                    vendor.vendors?.map(vendor => <Vendor key={vendor.id} vendor={vendor} />)
                }
            </div>
        </>
    )
}