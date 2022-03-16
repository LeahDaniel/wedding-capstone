import React from "react"
import { Route } from "react-router-dom"
import { ContractList } from "./contracts/ContractList"
import HostProfile from "./host/HostProfile"
import MessageList from "./messages/MessageList"
import MessageView from "./messages/MessageView"
import VendorProfile from "./vendor/VendorProfile"


export const ApplicationViews = ({isHost, isVendor}) => {

    return (
        <>
            <Route exact path="/">
                <ContractList />
            </Route>
            <Route exact path="/hosts/:hostId(\d+)">
                <HostProfile isVendor={isVendor}/>
            </Route>
            <Route exact path="/hosts/profile">
                <HostProfile isHost={isHost}/>
            </Route>
            <Route exact path="/messages">
                <MessageView />
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