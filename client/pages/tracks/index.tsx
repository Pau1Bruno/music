import React, {useState} from "react";
import MainLayout from "../../layouts/MainLayout";
import {Button, Card, Grid, TextField} from "@mui/material";
import {useRouter} from "next/router";
import Box from "@mui/material/Box";
import TrackList from "../../components/TrackList";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {NextThunkDispatch, wrapper} from "../../store";
import {fetchTracks, searchTracks} from "../../store/action-creators/tracks";
import {useDispatch} from "react-redux";
import "../../styles/track/TrackIndex.module.scss";

const Index = () => {
    const router = useRouter();
    const { tracks, error } = useTypedSelector(state => state.track);
    const [ query, setQuery ] = useState<string>("");
    const dispatch = useDispatch() as NextThunkDispatch;
    const [ timer, setTimer ] = useState<null | ReturnType<typeof setTimeout>>(null);

    if (error) {
        return (
            <MainLayout>
                <h1>Ошибка при загрузке треков</h1>
            </MainLayout>
        );
    }

    // Функция отправки на сервер поискового запроса
    const search = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);

        // обнуление таймера, если строка запроса меняется в течение 500 мс
        if (timer) {
            clearTimeout(timer);
        }

        // создаёт таймер каждый раз после последнего действия на 500 мс,
        // если 500 мс проходят без изменений строки поиска, то запрос отправляется
        await setTimer(
            setTimeout(async () => {
                await dispatch(await searchTracks(e.target.value));
            }, 500)
        );
    };

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
                        onChange={search}
                    />

                    <TrackList serverTracks={tracks} />

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
