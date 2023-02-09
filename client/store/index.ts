import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { reducer } from "./reducers";


export const store = () =>
    configureStore({
        reducer: {
            reducer
        }
    });

export const wrapper = createWrapper(store, { debug: true });
