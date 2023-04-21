import React from "react";
import { ITrack } from "../types/tracks";
import TrackItem from "./TrackItem/TrackItem";

interface TrackListProps {
    serverTracks: ITrack[];
}

const TrackList: React.FC<TrackListProps> = ({ serverTracks }) => {
    return (
        
        <div style={{ display: "flex", flexDirection: "column" }}>
            {serverTracks.map(track =>
                <TrackItem
                    key={track._id}
                    track={track}
                />
            )}
        </div>
    
    );
};

export default TrackList;
