import React from "react";

interface VolumeProgressProps {
    left: number;
    right: number;
    onChange: (e: any) => void;
}

const VolumeProgress: React.FC<VolumeProgressProps> = ({ left, right, onChange }) => {
    return (
        <input
            type="range"
            min={0}
            value={left}
            max={right}
            onChange={onChange}
        />
    );
};

export default VolumeProgress;
