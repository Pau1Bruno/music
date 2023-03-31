import {configureStore, ThunkDispatch} from "@reduxjs/toolkit";
import {createWrapper} from "next-redux-wrapper";
import {reducer, RootState} from "./reducers";
import thunk from "redux-thunk";
import {AnyAction} from "redux";
import {api} from "./reducers/apiSlice";

export const makeStore = () =>
    configureStore({
        reducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk, api.middleware)
    });

export type AppStore = ReturnType<typeof makeStore>;
export const wrapper
    =
    createWrapper<AppStore>(makeStore, { debug: true });

export type NextThunkDispatch = ThunkDispatch<RootState, void, AnyAction>;