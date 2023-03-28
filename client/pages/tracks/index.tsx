import React, {useState} from "react";
import MainLayout from "../../layouts/MainLayout";
import {Button, Card, Grid, TextField} from "@mui/material";
import {useRouter} from "next/router";
import Box from "@mui/material/Box";
import TrackList from "../../components/TrackList";
import {NextThunkDispatch, wrapper} from "../../store";
import {fetchTracks} from "../../store/action-creators/tracks";
import "../../styles/track/TrackIndex.module.scss";
import {useSearchTracksQuery} from "../../store/reducers/apiSlice";

const Index = () => {
    const router = useRouter();
    const [ query, setQuery ] = useState<string>("");

    const { data: searchData, isLoading, error } = useSearchTracksQuery(query);
    console.log(searchData, isLoading);

    if (error) {
        return (
            <MainLayout>
                <h1>Ошибка при загрузке треков</h1>
            </MainLayout>
        );
    }

    return (
        <MainLayout title={"Tracks"}>
            <Grid container justifyContent="center">
                <Card>

                    <Box p={2}>
                        <Grid container justifyContent="space-around">
                            <h1>List of tracks</h1>
                            <Button onClick={() => router.push("tracks/create")}>Upload your track</Button>
                        </Grid>
                    </Box>

                    <TextField
                        fullWidth
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />

                    {!isLoading && <TrackList serverTracks={searchData} />}

                </Card>
            </Grid>
        </MainLayout>
    );
};

export default Index;

export const getServerSideProps = wrapper.getServerSideProps(
    store => async () => {
        const dispatch = store.dispatch as NextThunkDispatch;
        await dispatch(fetchTracks());
        return { props: {} };
    }
);
