import React from "react";
import { useContextSelector } from "use-context-selector";
import { ITrack } from "../../../types/tracks";
import IconButton from "@mui/material/IconButton";
import { Delete, Pause, PlayArrow } from "@mui/icons-material";
import { useAction } from "../../../hooks/useAction";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useTimeConverter } from "../../../hooks/useTimeConverter";
import { useDeleteTrackMutation } from "../../../store/reducers/apiSlice";
import Image from "next/image";
import { DarkModeContext } from "../../../context/ThemesContext";
import styles from "./TrackItem.module.scss";
import { useRouter } from "next/router";

interface TrackItemProps {
    track: ITrack,
}

const TrackItem: React.FC<TrackItemProps> = ({ track }) => {
    const {active, pause, currentTime, duration} = useTypedSelector(state => state.player);
    const {playTrack, pauseTrack, setActiveTrack} = useAction();
    const [ deleteTrack ] = useDeleteTrackMutation();

    const router = useRouter();

    const darkMode = useContextSelector(DarkModeContext,
        (state) => state.darkMode);

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

    const trackLogo: string = 'http://localhost:5000/' + track.picture;
    
    return (
        <div className={darkMode ? styles.dark : styles.light}>
            <div className={styles.container}>
                <div className={styles.track} onClick={() => router.push("tracks/" + track._id)}>
                    <div className={styles.left}>

                        <IconButton onClick={play} className={styles.play_pause}>
                            {!pause && active === track
                                ? <Pause/>
                                : <PlayArrow/>
                            }
                        </IconButton>


                        <Image
                            className={styles.logo}
                            src={trackLogo}
                            alt={'track logo'}
                            width={32}
                            height={32}
                            quality={50}
                        />

                        <div className={styles.info}>
                            <div>{track.name}</div>
                            <div>{track.artist}</div>
                        </div>
                    </div>

                    <div className={styles.right}>
                        {active === track && <div className={styles.trackTime}> {left}/{right} </div>}

                        <IconButton onClick={deleteTrackFunction} className={styles.delete}>
                            <Delete/>
                        </IconButton>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default TrackItem;
