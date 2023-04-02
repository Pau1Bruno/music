import React, {useState} from "react";
import {useRouter} from "next/router";
import MainLayout from "../../layouts/MainLayout";
import {Button, Grid, TextField} from "@mui/material";
import {GetServerSideProps} from "next";
import axios from "axios";
import Image from "next/image";
import {ITrack} from "../../types/tracks";
import {useInput} from "../../hooks/useInput";
import {Delete} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";

const TrackPage = ({ serverTrack }: { serverTrack: ITrack }) => {
    const [ track, setTrack ] = useState<ITrack>(serverTrack);
    const router = useRouter();
    const username = useInput("");
    const comment = useInput("");

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

    const backToTracksHandler = () => {
        router.push("/tracks").then();
    }

    return (
        <MainLayout
            title={track.name + ' - ' + track.artist}
            keywords={'music, artist, ' + track.name + ', ' + track.artist}
        >

            <Grid container direction="column" alignItems="center">
                <Button onClick={backToTracksHandler}>Return to track list</Button>
                <h1>Track id: {track._id}</h1>
                <Image src={`http://localhost:5000/${track.picture}`} alt="no image" width={100} height={100}
                       unoptimized={true} />
                <h1>Track name: {track.name}</h1>
            </Grid>

            <Grid container direction="column" textAlign="center" width={600} gap={1}>
                <h1>Your opinion about track:</h1>
                <TextField
                    label="your name"
                    {...username}
                />
                <TextField
                    label="your comment"
                    {...comment}
                />
                <Button onClick={addComment}>Send comment</Button>

                <h2>All comments:</h2>
                {track.comments.map(comm =>
                    <Grid key={comm._id} display="flex" gap={1}>
                        <p>{comm.username}:</p>
                        <p>{comm.text}</p>
                        <IconButton onClick={() => deleteComment(comm._id)}>
                            <Delete />
                        </IconButton>
                    </Grid>
                )}

            </Grid>

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