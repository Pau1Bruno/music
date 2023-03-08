import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../store/reducers";


// "useSelector" but with type RootState
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
