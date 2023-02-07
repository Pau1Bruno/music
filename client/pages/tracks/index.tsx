import React from "react";
import MainLayout from "../../layouts/MainLayout";
import { Button, Card, Grid } from "@mui/material";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import { ITrack } from "../../types/tracks";
import TrackList from "../../components/TrackList";
import "../../styles/track/TrackIndex.module.scss";

const Index = () => {
    let router = useRouter();
    const tracks: ITrack[] = [ {
        "_id": "63d0631137e1bfd6c63ff3d0",
        "name": "4",
        "artist": "4",
        "text": "4",
        "listens": 0,
        "picture": "http://localhost:5000/image/ae34a36f-7712-4cea-8ccf-1c2a95216786.jpg",
        "audio": "http://localhost:5000/audio/022f3394-48f3-4f9b-9275-089d1fded159.mp3",
        "comments": []
    }, {
        "_id": "63d92be2efcb8a6e05c2e6fd",
        "name": "1",
        "artist": "1",
        "text": "1",
        "listens": 0,
        "picture": "http://localhost:5000/image/fd6e4c5b-73f3-499e-a3ee-dd065c49a9cd.jpg",
        "audio": "http://localhost:5000/audio/51df5889-2d87-4f02-b4d7-53f59845ec13.mp3",
        "comments": []
    }, {
        "_id": "63d92bebefcb8a6e05c2e6ff",
        "name": "2",
        "artist": "2",
        "text": "2",
        "listens": 0,
        "picture": "http://localhost:5000/image/acd1b3c8-c1f3-471d-9d8d-9325dd7ac450.jpg",
        "audio": "http://localhost:5000/audio/87c5902f-53f9-470e-b809-45db8f044976.mp3",
        "comments": []
    }, {
        "_id": "63d92bf3efcb8a6e05c2e701",
        "name": "3",
        "artist": "3",
        "text": "3",
        "listens": 0,
        "picture": "http://localhost:5000/image/9df75bba-9c72-41d1-bf57-9982ad23cfee.jpg",
        "audio": "http://localhost:5000/audio/336b0785-5355-4f46-a5ff-cd59ab2fff95.mp3",
        "comments": []
    } ];

    return (
        <MainLayout>
            <Grid container justifyContent="center">
                <Card >
                    <Box p={ 2 }>
                        <Grid container justifyContent="space-around">
                            <h1>List of tracks</h1>
                            <Button onClick={ () => router.push("tracks/create") }>Upload your track</Button>
                        </Grid>
                    </Box>
                    <TrackList tracks={ tracks } />
                </Card>
            </Grid>
        </MainLayout>
    );
};

export default Index;

