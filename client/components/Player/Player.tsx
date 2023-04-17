import React, {useContext} from "react";
import IconButton from "@mui/material/IconButton";
import {Pause, PlayArrow, VolumeUp} from "@mui/icons-material";
import styles from "./Player.module.scss";
import TrackProgress from "./Player Bars/TrackProgress";
import VolumeProgress from "./Player Bars/VolumeProgress";
import useAudioPlayer from "../../hooks/useSetAudio";
import {DarkModeContext} from "../../context/ThemesContext";

const Player = () => {
    const { darkMode } = useContext(DarkModeContext);

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

    // If there is no active track - Player doesn't display
    if (!active) {
        return null;
    }

    return (
        <div className={darkMode ? styles.dark : styles.light}>
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