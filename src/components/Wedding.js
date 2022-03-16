import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { ApplicationViews } from "./ApplicationViews";
import { NavBar } from "./nav/NavBar";
import { Login } from "./auth/Login";
import { RegisterHost } from "./auth/RegisterHost";
import { RegisterVendor } from "./auth/RegisterVendor";

export const Wedding = () => {
    const [isVendor, setIsVendor] = useState(false)
    const [isHost, setIsHost] = useState(false)

    useEffect(()=> {
        let boolean = localStorage.getItem("is_vendor")
        if(boolean === "true"){
            setIsVendor(true)
        }else if(boolean === "false") {
            setIsHost(true)
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
                                <NavBar isHost={isHost} isVendor={isVendor}/>
                                <div className="container">
                                    <ApplicationViews isHost={isHost} isVendor={isVendor}/>
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
                <Login setIsHost={setIsHost} setIsVendor={setIsVendor}/>
            </Route>
            <Route path="/registerHost">
                <RegisterHost setIsHost={setIsHost}/>
            </Route>
            <Route path="/registerVendor">
                <RegisterVendor setIsVendor={setIsVendor}/>
            </Route>
        </>
    )
};