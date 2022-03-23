import React, { useState, useEffect } from "react"
import { getUpcomingContracts } from "../../managers/HostVendorManager"
import { Contract } from "./Contract"

export const ContractList = () => {
    const [contracts, setContracts] = useState([])

    useEffect(() => {
        getUpcomingContracts().then(setContracts)
    }, [])

    return (
        <>
            <h1 className="is-size-4 has-text-centered my-5 py-5">Your Upcoming Events</h1>
            <div>
                {
                    contracts.map(contract => <Contract key={contract.id} contract={contract} />)
                }
            </div>
        </>
    )
}