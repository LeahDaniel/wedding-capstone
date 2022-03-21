import React from "react"
import { Route } from "react-router-dom"
import { ContractList } from "./contracts/ContractList"
import {HostProfile} from "./host/HostProfile"
import {MessageList} from "./messages/MessageList"
import {MessageView} from "./messages/MessageView"
import {VendorCategories} from "./vendor/VendorCategories"
import { VendorList } from "./vendor/VendorList"
import {VendorProfile} from "./vendor/VendorProfile"
import {WeddingDetails} from "./wedding/WeddingDetails"


export const ApplicationViews = ({ isVendor }) => {

    return (
        <>
            {
                isVendor
                    ? <Route exact path="/">
                        <ContractList />
                    </Route>
                    : <Route exact path="/">
                        <VendorCategories />
                    </Route>
            }
            {
                isVendor
                    ? <Route exact path="/messages/:hostId(\d+)">
                        <MessageList isVendor={isVendor} />
                    </Route>
                    : <Route exact path="/messages/:vendorId(\d+)">
                        <MessageList isVendor={isVendor} />
                    </Route>
            }

            <Route exact path="/hosts/:hostId(\d+)">
                <HostProfile isVendor={isVendor} />
            </Route>
            <Route exact path="/hosts/profile">
                <HostProfile isVendor={isVendor} />
            </Route>
            <Route exact path="/messages">
                <MessageView isVendor={isVendor} />
            </Route>
            <Route exact path="/vendors/:vendorId(\d+)">
                <VendorProfile isVendor={isVendor} />
            </Route>
            <Route exact path="/vendors/type/:vendorTypeId(\d+)">
                <VendorList />
            </Route>
            <Route exact path="/vendors/profile">
                <VendorProfile isVendor={isVendor} />
            </Route>
            <Route exact path="/hosts/wedding">
                <WeddingDetails />
            </Route>
        </>
    )
}