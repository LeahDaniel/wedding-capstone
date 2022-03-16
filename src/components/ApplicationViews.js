import React from "react"
import { Route } from "react-router-dom"
import { ContractList } from "./contracts/ContractList"
import HostProfile from "./host/HostProfile"
import MessageList from "./messages/MessageList"
import MessageView from "./messages/MessageView"
import VendorProfile from "./vendor/VendorProfile"


export const ApplicationViews = ({ isHost, isVendor }) => {

    return (
        <>
            {
                isVendor
                    ? <Route exact path="/">
                        <ContractList />
                    </Route>
                    : <Route exact path="/">

                    </Route>
            }

            <Route exact path="/hosts/:hostId(\d+)">
                <HostProfile isVendor={isVendor} />
            </Route>
            <Route exact path="/hosts/profile">
                <HostProfile isHost={isHost} />
            </Route>
            <Route exact path="/messages">
                <MessageView isVendor={isVendor} isHost={isHost} />
            </Route>
            <Route exact path="/messages/:hostId(\d+)">
                <MessageList isVendor={isVendor} isHost={isHost} />
            </Route>
            <Route exact path="/vendors/:vendorId(\d+)">
                <VendorProfile isHost={isHost} />
            </Route>
            <Route exact path="/vendors/profile">
                <VendorProfile isVendor={isVendor} />
            </Route>
        </>
    )
}