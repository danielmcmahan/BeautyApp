import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router";
import axios from "axios";

// client context provider
import ClientContextProvider from "./Context/ClientContextProvider";
import PostClientInfoContextProvider from "./Context/PostClientInfoContextProvider";

import { StartUp } from "./StartUp";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// pages
import Login from "./Pages/Login/Login";
import Clients from "./Pages/Client/Clients";
import ClientWrapper from "./Pages/Client/ClientInner/ClientWrapper";
import Footer from "./Components/Common/Footer/Footer";
import ModalContextProvider from "./Context/ModalContextProvider";

import Header from "./Components/Common/Header/Header";
import Admin from "./Pages/Admin/Admin";
import UserContextProvider from "./Context/UserContextProvider";
import { CurrentUserID } from "./Components/Common/UserTable/UserTable";

// booting App
StartUp();

const BeautyApp = () => {
    let location = useLocation();

    const [showHeader, setShowHeader] = useState(false);

    axios.defaults.headers.common[
        "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;

    useEffect(() => {
        if (location.pathname !== "/" && location.pathname !== "/admin")
            setShowHeader(true);
        else
            setShowHeader(false);
    }, [location])

    return (
        <>
            <PostClientInfoContextProvider>
                <ModalContextProvider>
                    {showHeader && <Header />}

                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route
                            path="/admin"
                            element={
                                <ClientContextProvider>
                                    <UserContextProvider>
                                        <Admin />
                                    </UserContextProvider>
                                </ClientContextProvider>
                            }
                        />
                        <Route
                            path="/clients"
                            element={
                                <ClientContextProvider>
                                    <Clients />
                                </ClientContextProvider>
                            }
                        />
                        <Route
                            path="/clients/:id"
                            element={
                                <ClientContextProvider>
                                    <ClientWrapper />
                                </ClientContextProvider>
                            }
                        />
                    </Routes>

                    <Footer />
                </ModalContextProvider>
            </PostClientInfoContextProvider>

            {toast.configure({
                autoClose: 1000,
            })}
        </>
    );
};

export default BeautyApp;
