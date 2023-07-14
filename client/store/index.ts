import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import thunk from "redux-thunk";
import { api } from "./reducers/apiSlice";
import playerReducer from "./reducers/playerSlice";
import trackReducer from "./reducers/trackSlice"

export type RootState = {
    player: ReturnType<typeof playerReducer>;
    track: ReturnType<typeof trackReducer>;
    [api.reducerPath]: ReturnType<typeof api.reducer>;
}

export const makeStore = () => configureStore
({
    reducer: {
        player: playerReducer,
        track: trackReducer,
        [api.reducerPath]: api.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk, api.middleware)
});

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = ReturnType<typeof makeStore>["dispatch"];
export const wrapper
    =
    createWrapper<AppStore>(makeStore, { debug: true });