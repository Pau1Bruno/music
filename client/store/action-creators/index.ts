import * as PlayerActionCreators from "../reducers/playerSlice";
import * as TrackActionCreators from "../action-creators/tracks";

export default {
    ...PlayerActionCreators,
    ...TrackActionCreators
};