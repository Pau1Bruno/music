import React from "react";
import styles from "../Player.module.scss";

interface VolumeProgressProps {
    left: number;
    right: number;
    onChange: (e: any) => void;
}

const VolumeProgress: React.FC<VolumeProgressProps> = ({ left, right, onChange }) => {
    return (
        <div className={styles.volume_progress_container}>
            <input
                className={styles.volume_bar}
                type="range"
                min={0}
                value={left}
                max={right}
                onChange={onChange}
            />
        </div>
    );
};

export default VolumeProgress;
