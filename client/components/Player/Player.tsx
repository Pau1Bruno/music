import React, {useEffect} from "react";
import IconButton from "@mui/material/IconButton";
import {Pause, PlayArrow, VolumeUp} from "@mui/icons-material";
import styles from "./Player.module.scss";
import TrackProgress from "./TrackProgress";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useAction} from "../../hooks/useAction";
import VolumeProgress from "./VolumeProgress";
import {useAddListenMutation} from "../../store/reducers/apiSlice";

let audio: HTMLAudioElement; // declare variable, browser API

const Player = () => {
    const { active, pause, volume, currentTime, duration } = useTypedSelector(state => state.player);
    const { playTrack, pauseTrack, setVolume, setCurrentTime, setDuration } = useAction();
    const [ addListen ] = useAddListenMutation();

    useEffect(() => {
        if (!audio) {
            audio = new Audio();
        } else setAudio();
    }, [ active ]);

    const setAudio = () => {
        if (active) {
            audio.src = `http://localhost:5000/${active.audio}`;
            audio.volume = volume / 100;

            // As track downloaded
            audio.onloadedmetadata = () => {
                setDuration(Math.trunc(audio.duration));
            };

            // Add listen to a server after track is ended / autoplay
            audio.onended = () => {
                addListen(active._id);
                audio.play();
            };

            // On playing track
            audio.ontimeupdate = () => {
                setCurrentTime(Math.trunc(audio.currentTime));
            };
        }
    };

    // для того, чтобы пауза и проигрывание работали из списка
    useEffect(() => {
        if (!pause) {
            audio.play();
        } else {
            audio.pause();
        }
    }, [ pause ]);

    const play = () => {
        if (pause) {
            playTrack();
            audio.play();
        } else {
            pauseTrack();
            audio.pause();
        }
    };

    const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
        audio.volume = Number(e.target.value) / 100;
        setVolume(Number(e.target.value));
    };

    const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
        audio.currentTime = Number(e.target.value);
        setCurrentTime(Math.trunc(audio.currentTime));
    };

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

                <div className={styles.volume}>
                    <VolumeUp />
                    <VolumeProgress left={volume} right={100} onChange={changeVolume} />
                </div>

            </div>
        </div>

    );
};

export default Player;
