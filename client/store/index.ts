import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { reducer } from "./reducers";

const store = () =>
    configureStore({
        reducer
    });

export const wrapper = createWrapper(store, {debug: true});