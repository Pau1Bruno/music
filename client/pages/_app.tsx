import React, { FC, useEffect } from "react";
import { Provider } from "react-redux";
import { AppProps } from "next/app";
import { wrapper } from "../store";
import Head from "next/head";
import { setupListeners } from "@reduxjs/toolkit/query";
import Navbar from "../components/Navbar/Navbar";
import Player from "../components/Player/Player";
import DarkModeContextProvider from "../context/ThemesContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/global.scss";
import { useRouter } from "next/router";

const MyApp: FC<AppProps> = ({ Component, ...rest }) => {
    const { store, props } = wrapper.useWrappedStore(rest);
    
    const router = useRouter();
    
    useEffect(() => {
        const jwt = localStorage.getItem("jwt");
        if (!jwt && router.pathname !== "/login" && router.pathname !== "/signup") {
            router.push("/login");
        }
    }, [ router.pathname ]);
    
    setupListeners(store.dispatch);
    
    // Conditionally render the Navbar
    const showBars: boolean = router.pathname !== "/login" && router.pathname !== "/signup";

    
    return (
        <Provider store={store}>
            <>
                <Head>
                    <link rel="apple-touch-icon" sizes="96x96" href="/icons96.png" />
                    <link rel="icon" type="image/png" sizes="32x32" href="/icons32.png" />
                    <link rel="icon" type="image/png" sizes="16x16" href="/icons16.png" />
                </Head>
                <DarkModeContextProvider>
                    {showBars && <Navbar />}
                    <Component {...props.pageProps} />
                    {showBars && <Player />}
                </DarkModeContextProvider>
            </>
        </Provider>
    );
};

export default MyApp;
