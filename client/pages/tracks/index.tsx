import React, { useContext, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import TrackList from "../../components/TrackList/TrackList";
import { useSearchTracksQuery } from "../../store/reducers/apiSlice";
import Link from "next/link";
import { DarkModeContext } from "../../context/ThemesContext";
import styles from "../../styles/track/TrackIndex.module.scss";

const Index = () => {
    const [ query, setQuery ] = useState<string>("");
    const [ timer, setTimer ] = useState<null | ReturnType<typeof setTimeout>>(null);
    const [ skip, setSkip ] = useState(false);
    
    const { darkMode } = useContext(DarkModeContext);
    
    const {
        data: tracks,
        isFetching,
        currentData,
        error
    } = useSearchTracksQuery(query, {
        skip: skip,
        pollingInterval: 100000
    });
    
    if (error) {
        return (
            <MainLayout title={"Error server data"}>
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
            <div className={styles.tracks_page}>
                <div className={darkMode ? styles.dark : styles.light}>
                    <div className={styles.track_container}>
                        
                        <div className={styles.tracks}>
                            <h3>All Tracks:</h3>
                            <Link href={"tracks/create"}>Upload track</Link>
                        </div>
                        
                        <input
                            className={styles.search}
                            value={query}
                            onChange={search}
                        />
                        {!isFetching && currentData && <TrackList serverTracks={tracks} />}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default Index;
