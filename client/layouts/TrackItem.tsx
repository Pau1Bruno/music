import React from "react";
import { ITrack } from "../types/tracks";

interface TrackItemProps {
    track: ITrack,
    active?: boolean,
}

const TrackItem: React.FC<TrackItemProps> = ( { track, active = false } ) => {
    return (
        <div>
            <h1>Song: { track.name }</h1>
            <h2>Artist: { track.artist }</h2>
        </div>
    );
};

export default TrackItem;
