import React from "react";
import IconButton from "@mui/material/IconButton";
import {Pause, PlayArrow, VolumeUp} from "@mui/icons-material";
import styles from "./Player.module.scss";
import TrackProgress from "./Player Bars/TrackProgress";
import VolumeProgress from "./Player Bars/VolumeProgress";
import useAudioPlayer from "../../hooks/useSetAudio";

const Player = () => {
    const {
        active,
        pause,
        volume,
        currentTime,
        duration,
        changeCurrentTime,
        changeVolume,
        play
    } = useAudioPlayer();

    // Если трек не выбран, то плеера не будет видно
    if (!active) {
        return null;
    }

    return (
        <div className={styles.player}>
            <div className={styles.left}>

                <IconButton onClick={play} className={styles.play_pause}>
                    {pause
                        ? <PlayArrow />
                        : <Pause />
                    }
                </IconButton>

                <div className={styles.song_info}>
                    <div>{active?.name}</div>
                    <div>{active?.artist}</div>
                </div>

                <div>
                    <TrackProgress left={currentTime} right={duration} onChange={changeCurrentTime}></TrackProgress>
                </div>
            </div>

            <div className={styles.right}>
                <VolumeUp />
                <VolumeProgress left={volume} right={100} onChange={changeVolume} />
            </div>

        </div>

    );
};

export default Player;