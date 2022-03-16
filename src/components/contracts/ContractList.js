import React, { useState, useEffect } from "react"
import { getCurrentVendor } from "../../managers/VendorManager"
import Contract from "./Contract"

export const ContractList = () => {
    const [vendor, setVendor] = useState({})

    useEffect(() => {
        getCurrentVendor().then(setVendor)
    }, [])

    return (
        <>
            <h1 className="subtitle">Your Upcoming Events</h1>
            <div>
                {
                    vendor.contracts?.map(contract => <Contract key={contract.id} contract={contract} />)
                }
            </div>
        </>
    )
}