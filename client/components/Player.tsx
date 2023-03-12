import React, { useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import { Pause, PlayArrow, VolumeUp } from "@mui/icons-material";
import styles from "../styles/Player.module.scss";
import { Grid } from "@mui/material";
import { ITrack } from "../types/tracks";
import TrackProgress from "./TrackProgress";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useAction } from "../hooks/useAction";


let audio: HTMLAudioElement; //Объявляем переменную audio, браузерное API

const Player = () => {
    const track: ITrack = {
        "_id": "63d0631137e1bfd6c63ff3d0",
        "name": "4",
        "artist": "4",
        "text": "4",
        "listens": 0,
        "picture": "http://localhost:5000/image/ae34a36f-7712-4cea-8ccf-1c2a95216786.jpg",
        "audio": "http://localhost:5000/audio/022f3394-48f3-4f9b-9275-089d1fded159.mp3",
        "comments": []
    };

    const { active, pause, volume, currentTime, duration } = useTypedSelector(state => state.player);
    const { playTrack, pauseTrack, setVolume, setCurrentTime, setDuration } = useAction();

    useEffect(() => {
        if ( !audio ) {
            audio = new Audio();
            audio.src = track.audio;
            audio.volume = volume / 100;
            // После того, как трек загрузился
            audio.onloadedmetadata = () => {
                setDuration(Math.trunc(audio.duration));
            }
            // При проигрывании трека меняет текущее время
            audio.ontimeupdate = () => {

                setCurrentTime(Math.trunc(audio.currentTime));
            }
        }
    }, []);
    const play = () => {
        if ( pause ) {
            playTrack();
            audio.play().then(r => console.log(r));
        } else {
            pauseTrack();
            audio.pause();
        }
    };
    const changeVolume = ( e: React.ChangeEvent<HTMLInputElement> ) => {
        audio.volume = Number(e.target.value) / 100;
        setVolume(Number(e.target.value));
    };

    const changeCurrentTime = ( e: React.ChangeEvent<HTMLInputElement> ) => {
        audio.currentTime = Number(e.target.value);
        setCurrentTime(Number(e.target.value));
    };

    return (
        <div className={ styles.player }>
            <IconButton onClick={ play }>
                { pause
                    ? <PlayArrow />
                    : <Pause />
                }
            </IconButton>
            <Grid container direction={ "column" } style={ { width: 200, margin: "0 20px" } }>
                <div>{ track.name }</div>
                <div>{ track.artist }</div>
            </Grid>
            <TrackProgress left={ currentTime } right={ duration } onChange={ changeCurrentTime } />
            <VolumeUp style={ { marginLeft: "auto" } } />
            <TrackProgress left={ volume } right={ 100 } onChange={ changeVolume } />
        </div>
    );
};

export default Player;
