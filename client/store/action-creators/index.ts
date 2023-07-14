import * as PlayerActionCreators from "../reducers/playerSlice";
import * as TrackActionCreators from "../reducers/trackSlice"

export default {
    ...PlayerActionCreators,
    ...TrackActionCreators
};