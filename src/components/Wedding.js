import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { ApplicationViews } from "./ApplicationViews";
import { NavBar } from "./nav/NavBar";
import { Login } from "./auth/Login";
import { RegisterHost } from "./auth/RegisterHost";
import { RegisterVendor } from "./auth/RegisterVendor";

export const Wedding = () => {
    const [isVendor, setIsVendor] = useState(null)

    useEffect(()=> {
        let boolean = localStorage.getItem("is_vendor")
        if(boolean === "true"){
            setIsVendor(true)
        }else if(boolean === "false") {
            setIsVendor(false)
        }
    })

    return (
        <>
            <Route
                render={() => {
                    // if there is a user logged in, show the navbar and app
                    if (localStorage.getItem("wedding_token")) {
                        return (
                            <>
                                <NavBar isVendor={isVendor}/>
                                <div className="container">
                                    <ApplicationViews isVendor={isVendor}/>
                                </div>
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
                <Login setIsVendor={setIsVendor}/>
            </Route>
            <Route path="/registerHost">
                <RegisterHost setIsVendor={setIsVendor}/>
            </Route>
            <Route path="/registerVendor">
                <RegisterVendor setIsVendor={setIsVendor}/>
            </Route>
        </>
    )
};