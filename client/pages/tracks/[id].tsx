import React, { useRef, useState } from "react";
import { useContextSelector } from "use-context-selector";
import { useRouter } from "next/router";
import MainLayout from "../../layouts/MainLayout";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { ITrack } from "../../types/tracks";
import { useInput } from "../../hooks/useInput";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import styles from "../../styles/track/Track[id].module.scss";
import { DarkModeContext } from "../../context/ThemesContext";
import { useAddCommentMutation, useGetAllCommentsQuery } from "../../store/reducers/apiSlice";
import CommentList from "../../components/CommentList/CommentList";
import { useAction } from "../../hooks/useAction";

const TrackPage = ({serverTrack}: { serverTrack: ITrack }) => {
    const [ track, setTrack ] = useState<ITrack>(serverTrack);
    const router = useRouter();
    const username = useInput("");
    const comment = useInput("");
    const imgRef = useRef(null);

    const {setTrackId} = useAction();

    setTrackId(serverTrack._id);

    const darkMode = useContextSelector(DarkModeContext,
        (state) => state.darkMode);

    const {isFetching, currentData, data: allComments} = useGetAllCommentsQuery(track._id);
    const [ addComment ] = useAddCommentMutation();

    const addComm = () => {
        const commentBody = {
            username: username.value,
            text: comment.value,
            trackId: track._id
        }
        addComment(commentBody);
    }

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
                            <Image
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
                            <p>Your comment:</p>
                            <input
                                {...username}
                                placeholder={"Username"}
                            />
                            <input
                                {...comment}
                                placeholder={"Comment"}
                            />
                            <button onClick={addComm}>Publish</button>
                        </div>
                    </div>

                    <div className={styles.comments_container}>
                        <h4>All comments:</h4>
                        {!isFetching && currentData && <CommentList allComments={allComments}/>}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default TrackPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const response = await fetch("http://localhost:5000/tracks/" + params?.id);
    const res = await response.json();

    return {
        props: {
            serverTrack: res
        }
    };
};