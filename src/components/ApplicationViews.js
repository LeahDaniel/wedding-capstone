import React from "react"
import { Route } from "react-router-dom"
import { ContractList } from "./vendor/contracts/ContractList"
import HostProfile from "./vendor/contracts/HostProfile"
import MessageList from "./vendor/messages/MessageList"
import MessageManager from "./vendor/messages/MessageManager"
import VendorProfile from "./vendor/profile/VendorProfile"


export const ApplicationViews = () => {

    return (
        <>
            <Route exact path="/">
                <ContractList />
            </Route>
            <Route exact path="/hosts/:hostId(\d+)">
                <HostProfile />
            </Route>
            <Route exact path="/messages">
                <MessageManager />
            </Route>
            <Route exact path="/messages/:hostId(\d+)">
                <MessageList />
            </Route>
            <Route exact path="/vendor/profile">
                <VendorProfile />
            </Route>
        </>
    )
}