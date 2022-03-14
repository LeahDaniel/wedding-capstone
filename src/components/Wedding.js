import React from "react";
import { Route, Redirect } from "react-router-dom";
import { ApplicationViews } from "./ApplicationViews";
import { NavBar } from "./nav/NavBar";
import { Login } from "./auth/Login";
import { RegisterHost } from "./auth/RegisterHost";
import { RegisterVendor } from "./auth/RegisterVendor";

export const Wedding = () => {
    return (
        <>
            <Route
                render={() => {
                    // if there is a user logged in, show the navbar and app
                    if (localStorage.getItem("wedding_token")) {
                        return (
                            <>
                                <NavBar/>
                                <ApplicationViews/>
                                <div className="bottom"></div>
                            </>
                        );
                        //otherwise show the login page
                    } else {
                        return <Redirect to="/login" />;
                    }
                }}
            />

            <Route path="/login">
                <Login />
            </Route>
            <Route path="/registerHost">
                <RegisterHost />
            </Route>
            <Route path="/registerVendor">
                <RegisterVendor />
            </Route>
        </>
    )
};