export interface ITrack {
    _id: string,
    name: string,
    artist: string,
    text: string,
    listens: number,
    picture: string,
    audio: string,
    comments: IComments[]
}

export interface IComments {
    _id: string,
    username: string,
    text: string
}

export interface TrackState {
    tracks: ITrack[],
    error: string
}

export enum TrackActionTypes {
    SEARCH_FETCH_TRACKS = 'SEARCH_FETCH_TRACKS',
    SEARCH_FETCH_TRACKS_ERROR = 'SEARCH_FETCH_TRACKS_ERROR',
    FETCH_TRACKS = 'FETCH_TRACKS',
    FETCH_TRACKS_ERROR = 'FETCH_TRACKS_ERROR',
}

interface SearchFetchTracksAction {
    type: TrackActionTypes.SEARCH_FETCH_TRACKS,
    payload: ITrack[]
}

interface SearchFetchTracksErrorAction {
    type: TrackActionTypes.SEARCH_FETCH_TRACKS_ERROR,
    payload: string
}

interface FetchTracksAction {
    type: TrackActionTypes.FETCH_TRACKS,
    payload: ITrack[]
}

interface FetchTracksErrorAction {
    type: TrackActionTypes.FETCH_TRACKS_ERROR,
    payload: string
}

export type TrackAction =
    FetchTracksAction
    | FetchTracksErrorAction
    | SearchFetchTracksAction
    | SearchFetchTracksErrorAction;