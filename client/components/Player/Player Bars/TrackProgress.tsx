import React from "react";
import { useTimeConverter } from "../../../hooks/useTimeConverter";
import styles from "../Player.module.scss";

interface TrackProgressProps {
    left: number;
    right: number;
    onChange: (e: any) => void;
}

const TrackProgress: React.FC<TrackProgressProps> = ({ left, right, onChange }) => {
    let curTime = useTimeConverter(left);
    let dur = useTimeConverter(right);
    
    return (
        <div className={styles.track_progress_container}>
            <input
                className={styles.track_bar}
                type="range"
                min={0}
                value={left}
                max={right}
                onChange={onChange}
            />
            
            <div className={styles.track_timer}>{curTime} / {dur}</div>
        </div>
    );
};

export default TrackProgress;
