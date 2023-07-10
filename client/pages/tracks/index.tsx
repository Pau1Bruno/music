import React, { useState } from "react";
import { useContextSelector } from "use-context-selector";
import MainLayout from "../../layouts/MainLayout";
import TrackList from "../../components/TrackList/TrackList";
import { useSearchTracksQuery } from "../../store/reducers/apiSlice";
import Link from "next/link";
import { DarkModeContext } from "../../context/ThemesContext";
import styles from "../../styles/track/TrackIndex.module.scss";
import MySelect from "../../components/MySelect/MySelect";

const Index = () => {
    const [ query, setQuery ] = useState<string>("");
    const [ timer, setTimer ] = useState<null | ReturnType<typeof setTimeout>>(null);
    const [ skip, setSkip ] = useState(false);
    const [ selectedSort, setSelectedSort ] = useState<string>("name");

    const darkMode = useContextSelector(DarkModeContext,
        (state) => state.darkMode);
    
    const {
        data: serverTracks,
        isFetching,
        currentData,
        error
    } = useSearchTracksQuery({ query, selectedSort }, {
        skip: skip,
        pollingInterval: 100000
    });

    const sortTracks = (sort: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedSort(sort.target.value);
        console.log(sort.target.value)
    };
    
    // Function which send get query to a server after you end typing in search field
    const search = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setSkip(true);
        setQuery(e.target.value);
        
        // reset timer if you type during delay (500ms)
        if (timer) {
            clearTimeout(timer);
        }
        
        // the timer, after 500 ms from the last typed character send a query
        await setTimer(
            setTimeout(async () => {
                setSkip(false);
            }, 500)
        );
    };
    
    if (error) {
        return (
            <MainLayout title={"Error server data"}>
                <h1>Ошибка при загрузке треков</h1>
            </MainLayout>
        );
    }
    
    return (
        <MainLayout title={"Tracks"}>
            <div className={darkMode ? styles.dark : styles.light}>
                <div className={styles.page}>
                    <div className={styles.container}>

                        <div className={styles.tracks}>
                            <h3>Tracks:</h3>
                            <Link href={"tracks/create"}>Upload track</Link>
                        </div>

                        <input
                            className={styles.search}
                            value={query}
                            onChange={search}
                        />

                        <MySelect
                            value={selectedSort}
                            onChange={sortTracks}
                            defaultValue={"Sort by"}
                            options={[
                                { name: "name", value: "name" },
                                { name: "popularity", value: "listens" }
                            ]}
                        />

                        {!isFetching && currentData && <TrackList serverTracks={serverTracks} />}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default Index;
