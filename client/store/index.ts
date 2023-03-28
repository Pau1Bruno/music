import {configureStore, ThunkDispatch} from "@reduxjs/toolkit";
import {createWrapper} from "next-redux-wrapper";
import {reducer, RootState} from "./reducers";
import thunk from "redux-thunk";
import {AnyAction} from "redux";
import {api} from "./reducers/apiSlice";

const store = () =>
    configureStore({
        reducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk, api.middleware)
    });

export const wrapper = createWrapper(store, { debug: true });

export type NextThunkDispatch = ThunkDispatch<RootState, void, AnyAction>;