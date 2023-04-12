import React, {useState} from "react";
import MainLayout from "../../layouts/MainLayout";
import {useRouter} from "next/router";
import TrackList from "../../components/TrackList";
import {useSearchTracksQuery} from "../../store/reducers/apiSlice";
import Link from "next/link";
import styles from "./../../styles/track/TrackIndex.module.scss";

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
            <div className={styles.track_container}>

                <div className={styles.tracks}>
                    <h1>List of tracks</h1>
                    <Link href={"tracks/create"}>Upload your track</Link>
                </div>

                <input
                    className={styles.search}
                    value={query}
                    onChange={search}
                />
                {!isFetching && currentData && <TrackList serverTracks={tracks} />}

            </div>
        </MainLayout>
    );
};

export default Index;
