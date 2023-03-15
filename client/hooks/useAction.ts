import {useDispatch} from "react-redux";
import {bindActionCreators} from "redux";
import ActionCreators from "../store/action-creators";


export const useAction = () => {
    const dispatch = useDispatch();
    // Every action creator wrapped into a dispatch call, so they may be invoked directly.
    return bindActionCreators(ActionCreators, dispatch);
};