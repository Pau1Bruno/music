import React from "react";
import { useTimeConverter } from "../hooks/useTimeConverter";

interface TrackProgressProps {
    left: number;
    right: number;
    onChange: ( e: any ) => void;
}

const TrackProgress: React.FC<TrackProgressProps> = ( { left, right, onChange } ) => {
    let curTime = useTimeConverter(left);
    let dur = useTimeConverter(right);


    return (
        <div style={{display: "flex"}}>
            <input
                type="range"
                min={0}
                max={right}
                value={left}
                onChange={onChange}
            />
            <div>{curTime} / {dur}</div>
        </div>
    );
};

export default TrackProgress;
