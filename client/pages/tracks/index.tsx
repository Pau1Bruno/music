import React from "react";
import MainLayout from "../../layouts/MainLayout";
import {Button, Card, Grid} from "@mui/material";
import {useRouter} from "next/router";
import Box from "@mui/material/Box";
import TrackList from "../../components/TrackList";
import "../../styles/track/TrackIndex.module.scss";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {NextTypeDispatch, wrapper} from "../../store";
import {fetchTracks} from "../../store/action-creators/tracks";

const Index = () => {
    const router = useRouter();
    const { tracks, error } = useTypedSelector(state => state.track);


    if (error) {
        return (
            <MainLayout>
                <h1>Ошибка при загрузке треков</h1>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <Grid container justifyContent="center">
                <Card>
                    <Box p={2}>
                        <Grid container justifyContent="space-around">
                            <h1>List of tracks</h1>
                            <Button onClick={() => router.push("tracks/create")}>Upload your track</Button>
                        </Grid>
                    </Box>
                    <TrackList tracks={tracks} />
                </Card>
            </Grid>
        </MainLayout>
    );
};

export default Index;

export const getServerSideProps = wrapper.getServerSideProps(
    store => async () =>
    {
        const dispatch = store.dispatch as NextTypeDispatch;
        await dispatch(fetchTracks());
        return { props: {} }
    }
);
