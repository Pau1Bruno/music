import React from "react";
import { useContextSelector } from "use-context-selector";
import IconButton from "@mui/material/IconButton";
import { Pause, PlayArrow, VolumeUp } from "@mui/icons-material";
import styles from "./Player.module.scss";
import TrackProgress from "./Player Bars/TrackProgress";
import VolumeProgress from "./Player Bars/VolumeProgress";
import useAudioPlayer from "../../hooks/useSetAudio";
import { DarkModeContext } from "../../context/ThemesContext";

const Player = () => {
    const darkMode = useContextSelector(DarkModeContext,
        (state) => state.darkMode);
    
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
            <div className={styles.player}>
                <div className={styles.left}>

                    <IconButton onClick={play} className={styles.play_pause}>
                        {pause
                            ? <PlayArrow/>
                            : <Pause/>
                        }
                    </IconButton>

                    <div className={styles.song_info}>
                        <p>{active?.name}</p>
                        <p>{active?.artist}</p>
                    </div>

                    <IconButton onClick={play} className={styles.play_pause_mobile}>
                        {pause
                            ? <PlayArrow />
                            : <Pause />
                        }
                    </IconButton>

                </div>

                <div className={styles.middle}>
                    <TrackProgress left={currentTime} right={duration} onChange={changeCurrentTime}></TrackProgress>
                </div>

                <div className={styles.right}>
                    <VolumeUp />
                    <VolumeProgress left={volume} right={100} onChange={changeVolume} />
                </div>
            </div>
        </div>
    
    );
};

export default Player;