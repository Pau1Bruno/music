import React, {useState} from "react";
import MainLayout from "../../layouts/MainLayout";
import {Button, Card, Grid, TextField} from "@mui/material";
import {useRouter} from "next/router";
import Box from "@mui/material/Box";
import TrackList from "../../components/TrackList";
import "../../styles/track/TrackIndex.module.scss";
import {useSearchTracksQuery} from "../../store/reducers/apiSlice";

const Index = () => {
    const router = useRouter();
    const [ query, setQuery ] = useState<string>("");
    const [ timer, setTimer ] = useState<null | ReturnType<typeof setTimeout>>(null);
    const [ skip, setSkip ] = useState(false);

    const {
        data: tracks,
        isFetching,
        currentData,
        error
    } = useSearchTracksQuery(query, {
        skip: skip,
        pollingInterval: 50000
    });

    if (error) {
        return (
            <MainLayout>
                <h1>Ошибка при загрузке треков</h1>
            </MainLayout>
        );
    }

    // Функция отправки на сервер поискового запроса
    const search = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setSkip(true);
        setQuery(e.target.value);

        // обнуление таймера, если строка запроса меняется в течение 500 мс
        if (timer) {
            clearTimeout(timer);
        }

        // создаёт таймер каждый раз после последнего действия на 500 мс,
        // если 500 мс проходят без изменений строки поиска, то запрос отправляется
        await setTimer(
            setTimeout(async () => {
                setSkip(false);
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
                    {!isFetching && currentData && <TrackList serverTracks={tracks} />}
                </Card>
            </Grid>
        </MainLayout>
    );
};

export default Index;
