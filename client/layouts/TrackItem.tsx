import React from "react";
import { ITrack } from "../types/tracks";
import { Card, Grid } from "@mui/material";
import styles from "../styles/TrackItem.module.scss";
import IconButton from "@mui/material/IconButton";
import { Delete, PauseCircle, PlayArrow } from "@mui/icons-material";
import { useRouter } from "next/router";


interface TrackItemProps {
    track: ITrack,
    active?: boolean,
}

const TrackItem: React.FC<TrackItemProps> = ( { track, active = true } ) => {
    const router = useRouter();

    return (
        <Card className={ styles.track } onClick={() => router.push('tracks/' + track._id)}>
            <IconButton onClick={(e) => e.stopPropagation()}>
                { active
                    ? <PauseCircle />
                    : <PlayArrow />
                }
            </IconButton>
            <img className={ styles.picture } src={ track.picture } alt={ "track logo" } />
            <Grid container direction={"column"} style={{width: 200, margin: '0 20px'}}>
                <div>{ track.name }</div>
                <div>{ track.artist }</div>
            </Grid>
            {active && <div className={ styles.trackTime }> 2/3 </div>}
            <IconButton onClick={(e) => e.stopPropagation()} className={ styles.delete}>
                <Delete/>
            </IconButton>
        </Card>
    );
};

export default TrackItem;
