import React from "react";
import {useRouter} from "next/router";
import MainLayout from "../../layouts/MainLayout";
import {Button, Grid} from "@mui/material";
import {ITrack} from "../../types/tracks";

const TrackPage = () => {
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
    const router = useRouter();
    // const { id } = router.query;

    return (
        <MainLayout>
            <Grid container direction="column" alignItems="center">
                <Button onClick={() => router.push("/tracks")}>Return to track list</Button>
                <h1>Track id: {track._id}</h1>
            </Grid>
        </MainLayout>
    );
};

export default TrackPage;
