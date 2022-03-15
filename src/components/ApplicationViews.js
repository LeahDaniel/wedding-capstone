import React from "react"
import { Route } from "react-router-dom"
import { ContractList } from "./vendor/contracts/ContractList"


export const ApplicationViews = () => {

    return (
        <>
            <Route exact path="/">
                <ContractList/>
            </Route>
        </>
    )
}