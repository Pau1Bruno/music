import { AnyAction, combineReducers } from "redux";
import { playerReducer } from "./playerReducer";
import { HYDRATE } from "next-redux-wrapper";


export const rootReducer = combineReducers({
    player: playerReducer
});
export type RootState = ReturnType<typeof rootReducer>;


// create your reducer
export const reducer = ( state: RootState, action: AnyAction ) => {
    if ( action.type === HYDRATE ) {
        const nextState = {
            ...state, // use previous state
            ...action.payload // apply delta from hydration
        };
        return nextState;
    } else {
        return rootReducer(state, action);
    }
};

