import React, {useEffect} from "react";
import {ITrack} from "../types/tracks";
import {Card, Grid} from "@mui/material";
import styles from "../styles/track/TrackItem.module.scss";
import IconButton from "@mui/material/IconButton";
import {Delete, PauseCircle, PlayArrow} from "@mui/icons-material";
import {useRouter} from "next/router";
import {useAction} from "../hooks/useAction";


interface TrackItemProps {
    track: ITrack,
    active?: boolean,
}

const TrackItem: React.FC<TrackItemProps> = ({ track, active = false }) => {
    const router = useRouter();
    const { playTrack, pauseTrack, setActiveTrack } = useAction();

    // useEffect(() => {
    //     console.log(track, active);
    //     if (!active) {
    //         setActiveTrack(track);
    //         playTrack();
    //     } else {
    //         pauseTrack();
    //     }
    // }, [active]);

    const play = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!active) {
            // active = true
            setActiveTrack(track);
            playTrack();
        } else {
            pauseTrack();
            // active = false
        }
    };

    // const play = () => {
    //     if (pause) {
    //         playTrack();
    //         audio.play().then(() => console.log(audio));
    //     } else {
    //         pauseTrack();
    //         audio.pause();
    //     }
    // };


    return (
        <Card className={styles.track} onClick={() => router.push("tracks/" + track._id)}>
            <IconButton onClick={play}>
                {active
                    ? <PauseCircle />
                    : <PlayArrow />
                }
            </IconButton>
            <img className={styles.picture} src={`http://localhost:5000/${track.picture}`} alt={"track logo"} key={track._id}/>
            <Grid container direction={"column"} style={{ width: 200, margin: "0 20px" }}>
                <div>{track.name}</div>
                <div>{track.artist}</div>
            </Grid>
            {active && <div className={styles.trackTime}> 2/3 </div>}
            <IconButton onClick={(e) => e.stopPropagation()} className={styles.delete}>
                <Delete />
            </IconButton>
        </Card>
    );
};

export default TrackItem;
