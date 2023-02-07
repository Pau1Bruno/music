import React from "react";
import IconButton from "@mui/material/IconButton";
import { Pause, PlayArrow, VolumeUp } from "@mui/icons-material";
import styles from "../styles/Player.module.scss";
import { Grid } from "@mui/material";
import { ITrack } from "../types/tracks";
import TrackProgress from "./TrackProgress";

const Player = () => {
    const active = false;
    const track: ITrack = {
        "_id": "63d0631137e1bfd6c63ff3d0",
        "name": "4",
        "artist": "4",
        "text": "4",
        "listens": 0,
        "picture": "http://localhost:5000/image/ae34a36f-7712-4cea-8ccf-1c2a95216786.jpg",
        "audio": "http://localhost:5000/audio/022f3394-48f3-4f9b-9275-089d1fded159.mp3",
        "comments": []
    }

    return (
        <div className={styles.player}>
            <IconButton onClick={ e => e.stopPropagation() }>
                { !active
                    ? <PlayArrow />
                    : <Pause/>
                }
            </IconButton>
            <Grid container direction={"column"} style={{width: 200, margin: '0 20px'}}>
                <div>{ track.name }</div>
                <div>{ track.artist }</div>
            </Grid>
            <TrackProgress left={0} right={100} onChange={() => {}}/>
            <VolumeUp style={{marginLeft: "auto"}} />
            <TrackProgress left={0} right={100} onChange={() => {}}/>
        </div>
    );
};

export default Player;
