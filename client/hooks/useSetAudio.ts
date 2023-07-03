import React, { useEffect } from "react";
import { useTypedSelector } from "./useTypedSelector";
import { useAction } from "./useAction";
import { useAddListenMutation } from "../store/reducers/apiSlice";

let audio: HTMLAudioElement;

const useAudioPlayer = () => {
    const { active, pause, volume, currentTime, duration } = useTypedSelector((state) => state.player);
    const { playTrack, pauseTrack, setVolume, setCurrentTime, setDuration } = useAction();
    const [ addListen ] = useAddListenMutation();
    
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
                playTrack();
            };
            
            // On playing track
            audio.ontimeupdate = () => {
                setCurrentTime(Math.trunc(audio.currentTime));
            };
        }
    };
    
    useEffect(() => {
        if (!audio) {
            audio = new Audio();
        } else {
            setAudio();
        }
    }, [ active ]);
    
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
    
    return {
        active,
        pause,
        volume,
        currentTime,
        duration,
        play,
        changeVolume,
        changeCurrentTime
    };
};

export default useAudioPlayer;