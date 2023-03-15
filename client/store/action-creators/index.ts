import * as PlayerActionCreators from "../action-creators/player";
import * as TrackActionCreators from "../action-creators/tracks";

export default {
    ...PlayerActionCreators,
    ...TrackActionCreators
};