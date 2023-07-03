import { PlayerState } from "../../types/player";
import { createSlice } from "@reduxjs/toolkit";

// Начальное состояние playerReducer
const initialState: PlayerState = {
    active: null,
    pause: true,
    currentTime: 0,
    duration: 0,
    volume: 10
};

const playerSlice = createSlice({
    name: "player",
    initialState,
    reducers: {
        playTrack(state) {
            state.pause = false;
        },
        pauseTrack(state) {
            state.pause = true;
        },
        setActiveTrack(state, action) {
            state.active = action.payload;
        },
        setVolume(state, action) {
            state.volume = action.payload;
        },
        setDuration(state, action) {
            state.duration = action.payload;
        },
        setCurrentTime(state, action) {
            state.currentTime = action.payload;
        }
    }
});

export const { pauseTrack, playTrack, setActiveTrack, setVolume, setCurrentTime, setDuration } = playerSlice.actions;
export default playerSlice.reducer;