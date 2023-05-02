import React, { useContext, useRef, useState } from "react";
import { useRouter } from "next/router";
import MainLayout from "../../layouts/MainLayout";
import { GetServerSideProps } from "next";
import axios from "axios";
import { ITrack } from "../../types/tracks";
import { useInput } from "../../hooks/useInput";
import { Delete } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import styles from "../../styles/track/Track[id].module.scss";
import { DarkModeContext } from "../../context/ThemesContext";

const TrackPage = ({ serverTrack }: { serverTrack: ITrack }) => {
    const [ track, setTrack ] = useState<ITrack>(serverTrack);
    const router = useRouter();
    const username = useInput("");
    const comment = useInput("");
    const imgRef = useRef(null);
    
    const { darkMode } = useContext(DarkModeContext);
    
    const addComment = async () => {
        try {
            
            const response = await axios.post("http://localhost:5000/tracks/comment/", {
                username: username.value,
                text: comment.value,
                trackId: track._id
            });
            setTrack({ ...track, comments: [ ...track.comments, response.data ] });
        } catch (e) {
            console.error(e);
        }
    };
    
    const deleteComment = async (id: string) => {
        try {
            await axios.delete(`http://localhost:5000/tracks/${track._id}/comments/${id}`);
            setTrack({ ...track, comments: [ ...track.comments.filter(comm => comm._id !== id) ] });
        } catch (error) {
            console.error(error);
        }
    };
    
    return (
        <MainLayout
            title={track.name + " - " + track.artist}
            keywords={"music, artist, " + track.name + ", " + track.artist}
        >
            <div className={darkMode ? styles.dark : styles.light}>
                <div className={styles.page}>
                    <div className={styles.head}>
                        <Link href={"/tracks"} className={styles.return}>
                            <ArrowBackIcon />
                            Return to tracks
                        </Link>
                        <div className={styles.track}>
                            <img
                                ref={imgRef}
                                src={`http://localhost:5000/${track.picture}`}
                                width={128}
                                height={128}
                                alt={"ryo"}
                            />
                            <div className={styles.info}>
                                <h4>Artist: {track.artist}</h4>
                                <h4>Song: {track.name}</h4>
                            </div>
                        </div>
                    </div>
                    
                    <div className={styles.user_comment_container}>
                        <div className={styles.user_comment}>
                            <h4>Your opinion about track:</h4>
                            <input
                                {...username}
                                placeholder={"Username"}
                            />
                            <input
                                {...comment}
                                placeholder={"Comment"}
                            />
                            <button onClick={addComment}>Publish</button>
                        </div>
                    </div>
                    
                    <div className={styles.comments_container}>
                        <h4>All comments:</h4>
                        
                        <div className={styles.comments}>
                            {track.comments.map(comm =>
                                <div key={comm._id} className={styles.single_comment}>
                                    <p>{comm.username} : {comm.text}</p>
                                    <IconButton className={styles.delete} onClick={() => deleteComment(comm._id)}>
                                        <Delete />
                                    </IconButton>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default TrackPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const response = await axios.get("http://localhost:5000/tracks/" + params?.id);
    
    return {
        props: {
            serverTrack: response.data
        }
    };
};