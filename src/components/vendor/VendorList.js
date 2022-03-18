import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { getVendors } from "../../managers/VendorManager"
import Vendor from "./Vendor"
import VendorFilters from "./VendorFilters"

export const VendorList = () => {
    const {vendorTypeId} = useParams()
    const [vendors, setVendors] = useState([])
    const [userFilters, setUserFilters] = useState({
        maxPrice: "",
        minPrice: "",
        rating: 0
    })

    useEffect(() => {
        getVendors({type: vendorTypeId})
            .then(setVendors)
    }, [vendorTypeId])

    useEffect(() => {
        let filterObj = {type: vendorTypeId}

        if(userFilters.maxPrice !== ""){
            filterObj.maxPrice = userFilters.maxPrice
        }
        if(userFilters.minPrice !== ""){
            filterObj.minPrice = userFilters.minPrice
        }
        if(userFilters.rating !== 0){
            filterObj.rating = userFilters.rating
        }

        getVendors(filterObj)
            .then(setVendors)

    }, [userFilters])

    return (
        <>
            <VendorFilters userFilters={userFilters} setUserFilters={setUserFilters} />
            <div className="m-5">
                {
                    vendors.map(vendor => <Vendor key={vendor.id} vendor={vendor} />)
                }
            </div>
        </>
    )
}