import React, { useState, useEffect } from "react"
import { getUpcomingContracts } from "../../managers/HostVendorManager"
import Contract from "./Contract"

export const ContractList = () => {
    const [contracts, setContracts] = useState([])

    useEffect(() => {
        getUpcomingContracts().then(setContracts)
    }, [])

    return (
        <>
            <h1 className="subtitle">Your Upcoming Events</h1>
            <div>
                {
                    contracts.map(contract => <Contract key={contract.id} contract={contract} />)
                }
            </div>
        </>
    )
}