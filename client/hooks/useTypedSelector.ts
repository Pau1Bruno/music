import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../store";

// "useSelector" типизированный RootState
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
