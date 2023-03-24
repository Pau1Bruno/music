import React from "react";
import {ITrack} from "../types/tracks";
import {Grid} from "@mui/material";
import Box from "@mui/material/Box";
import TrackItem from "./TrackItem";

interface TrackListProps {
    serverTracks: ITrack[];
}

const TrackList: React.FC<TrackListProps> = ({ serverTracks }) => {
    // const deleteTrack = async (id: string) => {
    //     try {
    //         await axios.delete(`http://localhost:5000/tracks/${track._id}`);
    //         console.log(track);
    //         setTracks({ tracks.filter(comm => comm._id !== id) ] });
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    return (
        <Grid container direction="column">
            <Box p={2}>
                {serverTracks.map(track =>
                    <TrackItem
                        key={track._id}
                        track={track} />
                )}
            </Box>
        </Grid>
    );
};

export default TrackList;
