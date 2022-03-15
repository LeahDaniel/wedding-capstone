import React from "react"
import { Route } from "react-router-dom"
import { ContractList } from "./vendor/contracts/ContractList"
import HostProfile from "./vendor/contracts/HostProfile"


export const ApplicationViews = () => {

    return (
        <>
            <Route exact path="/">
                <ContractList/>
            </Route>
            <Route exact path="/hosts/:hostId(\d+)">
                <HostProfile />
            </Route>
        </>
    )
}