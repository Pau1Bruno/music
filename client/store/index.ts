import {configureStore, ThunkDispatch} from "@reduxjs/toolkit";
import {createWrapper} from "next-redux-wrapper";
import {reducer, RootState} from "./reducers";
import thunk from "redux-thunk";
import {AnyAction} from "redux";


const store = () =>
    configureStore({
        reducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
    });

export const wrapper = createWrapper(store, { debug: true });

export type NextTypeDispatch = ThunkDispatch<RootState, void, AnyAction>;