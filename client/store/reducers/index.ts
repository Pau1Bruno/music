import {AnyAction, combineReducers} from "redux";
import {playerReducer} from "./playerReducer";
import {HYDRATE} from "next-redux-wrapper";
import {trackReducer} from "./trackReducer";


const RootReducer = combineReducers({
    player: playerReducer,
    track: trackReducer,
});
export type RootState = ReturnType<typeof RootReducer>;


// Create reducer for the store
// There is problem with reducer declaration type (without any, there will be errors)
export const reducer: any = (state: RootState, action: AnyAction): RootState => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state, // use previous state
            ...action.payload // apply delta from hydration
        };
        return nextState;
    } else {
        return RootReducer(state, action);
    }
};