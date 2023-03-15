import {TypedUseSelectorHook, useSelector} from "react-redux";
import {RootState} from "../store/reducers";


// "useSelector" типизированный RootState
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
