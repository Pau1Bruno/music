import React from "react";
import { ITrack } from "../../types/tracks";
import TrackItem from "./TrackItem/TrackItem";

interface TrackListProps {
    serverTracks: ITrack[] | null;
}

const TrackList: React.FC<TrackListProps> = ({ serverTracks }) => {
    return (
        <div>
            {serverTracks?.map(track =>
                <TrackItem
                    key={track._id}
                    track={track}
                />
            )}
        </div>
    
    );
};

export default TrackList;
