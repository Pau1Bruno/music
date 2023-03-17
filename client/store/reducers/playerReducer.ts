import {PlayerAction, PlayerActionTypes, PlayerState} from "../../types/player";


// Начальное состояние playerReducer
const initialState: PlayerState = {
    pause: true,
    active: null,
    currentTime: 0,
    duration: 0,
    volume: 50
};

export const playerReducer = (state: PlayerState = initialState, action: PlayerAction): PlayerState => {
    switch (action.type) {
        case PlayerActionTypes.PLAY:
            return { ...state, pause: false };

        case PlayerActionTypes.PAUSE:
            return { ...state, pause: true };

        case PlayerActionTypes.SET_ACTIVE:
            return { ...state, active: action.payload };

        case PlayerActionTypes.SET_VOLUME:
            return { ...state, volume: action.payload };

        case PlayerActionTypes.SET_DURATION:
            return { ...state, duration: action.payload };

        case PlayerActionTypes.SET_CURRENT_TIME:
            return { ...state, currentTime: action.payload };

        default:
            return state;
    }
};