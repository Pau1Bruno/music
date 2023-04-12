import React from "react";
import {ITrack} from "../types/tracks";
import {Grid} from "@mui/material";
import Box from "@mui/material/Box";
import TrackItem from "./TrackItem/TrackItem";

interface TrackListProps {
    serverTracks: ITrack[];
}

const TrackList: React.FC<TrackListProps> = ({ serverTracks }) => {
    return (
        <Grid container direction="column">
            <Box p={2}>
                {serverTracks.map(track =>
                    <TrackItem
                        key={track._id}
                        track={track}
                    />
                )}
            </Box>
        </Grid>
    );
};

export default TrackList;
