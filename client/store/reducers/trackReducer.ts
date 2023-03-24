import {TrackAction, TrackActionTypes, TrackState} from "../../types/tracks";

const initialState: TrackState = {
    tracks: [],
    error: ''
}

export const trackReducer = (state = initialState, action: TrackAction): TrackState => {
    switch (action.type) {
        case TrackActionTypes.SEARCH_FETCH_TRACKS:
            return {error: '', tracks: action.payload}
        case TrackActionTypes.SEARCH_FETCH_TRACKS_ERROR:
            return {...state, error: action.payload}
        case TrackActionTypes.FETCH_TRACKS:
            return {error: '', tracks: action.payload}
        case TrackActionTypes.FETCH_TRACKS_ERROR:
            return {...state, error: action.payload}
        default:
            return state;
    }
}