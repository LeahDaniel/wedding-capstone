import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { getVendors } from "../../managers/VendorManager"
import {Vendor} from "./Vendor"
import {VendorFilters} from "./VendorFilters"

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

        if(userFilters.rating !== 0){
            filterObj.rating = userFilters.rating
        }

        getVendors(filterObj)
            .then((res)=> {
                let newArray = [...res]
                if(userFilters.maxPrice !== ""){
                    newArray = newArray.filter(vendor => vendor.average_cost <= parseInt(userFilters.maxPrice))
                }
                if(userFilters.minPrice !== ""){
                    newArray = newArray.filter(vendor => vendor.average_cost >= parseInt(userFilters.minPrice))
                }
                setVendors(newArray)
            })
                

    }, [userFilters, vendorTypeId])

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