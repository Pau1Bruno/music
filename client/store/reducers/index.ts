import { AnyAction, combineReducers } from "redux";
import { playerReducer } from "./playerReducer";
import { HYDRATE } from "next-redux-wrapper";


const RootReducer = combineReducers({
    player: playerReducer
});
export type RootState = ReturnType<typeof RootReducer>;


// create your reducer
//There is problem with reducer declaration type (without any, there will be errors)
export const reducer: any = ( state: RootState, action: AnyAction): RootState => {
    if ( action.type === HYDRATE ) {
        const nextState = {
            ...state, // use previous state
            ...action.payload // apply delta from hydration
        };
        return nextState;
    } else {
        return RootReducer(state, action);
    }
};