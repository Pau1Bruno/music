import React, {FC} from "react";
import {Provider} from "react-redux";
import {AppProps} from "next/app";
import {wrapper} from "../store";
import Head from "next/head";
import {setupListeners} from "@reduxjs/toolkit/query";

const MyApp: FC<AppProps> = ({ Component, ...rest }) => {
    const { store, props } = wrapper.useWrappedStore(rest);

    setupListeners(store.dispatch);

    return (
        <Provider store={store}>
            <>
                <Head>
                    <link rel="apple-touch-icon" sizes="96x96" href="../public/image/icons96.png" />
                    <link rel="icon" type="image/png" sizes="32x32" href="../public/image/icons32.png" />
                    <link rel="icon" type="image/png" sizes="16x16" href="../public/image/icons16.png" />
                </Head>
                <Component {...props.pageProps} />
            </>
        </Provider>
    );
};

export default MyApp;
