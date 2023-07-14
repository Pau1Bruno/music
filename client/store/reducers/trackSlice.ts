import { createSlice } from "@reduxjs/toolkit";
import { ICommentWithTrackIds } from "../../types/tracks";

const initialState: ICommentWithTrackIds = {
    trackId: null,
    commentId: null
}


const trackSlice = createSlice({
    name: "track",
    initialState,
    reducers: {
        setTrackId(state, action) {
            state.trackId = action.payload;
        },

        setCommentId(state, action) {
            state.commentId = action.payload;
        }
    }
});

export const {
    setTrackId,
    setCommentId,
} = trackSlice.actions
export default trackSlice.reducer