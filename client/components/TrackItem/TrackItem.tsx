import React, {useContext} from "react";
import {ITrack} from "../../types/tracks";
import {Card} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {Delete, Pause, PlayArrow} from "@mui/icons-material";
import {useAction} from "../../hooks/useAction";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useTimeConverter} from "../../hooks/useTimeConverter";
import {useDeleteTrackMutation} from "../../store/reducers/apiSlice";
import Link from "next/link";
import styles from "./TrackItem.module.scss";
import {DarkModeContext} from "../../context/ThemesContext";

interface TrackItemProps {
    track: ITrack,
}

const TrackItem: React.FC<TrackItemProps> = ({ track }) => {
    const { active, pause, currentTime, duration } = useTypedSelector(state => state.player);
    const { playTrack, pauseTrack, setActiveTrack } = useAction();
    const [ deleteTrack ] = useDeleteTrackMutation();

    const { darkMode } = useContext(DarkModeContext);

    const left = useTimeConverter(currentTime);
    const right = useTimeConverter(duration);

    const play = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setActiveTrack(track);
        if (pause) {
            playTrack();
        } else {
            pauseTrack();
        }
    };

    const deleteTrackFunction = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        deleteTrack(track._id);
    };

    return (
        <Link href={"tracks/" + track._id} className={darkMode ? styles.dark : styles.light}>
            <Card className={styles.track}>


                <IconButton onClick={play} className={styles.play_pause}>
                    {!pause && active === track
                        ? <Pause />
                        : <PlayArrow />
                    }
                </IconButton>


                <img className={styles.picture} src={`http://localhost:5000/${track.picture}`} alt={"track logo"}
                     key={track._id} />

                <div className={styles.track_info}>
                    <div>{track.name}</div>
                    <div>{track.artist}</div>
                </div>

                {active === track && <div className={styles.trackTime}> {left}/{right} </div>}

                <IconButton onClick={deleteTrackFunction} className={styles.delete}>
                    <Delete />
                </IconButton>
            </Card>
        </Link>
    )
        ;
};

export default TrackItem;
