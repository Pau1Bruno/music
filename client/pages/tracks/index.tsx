import React from "react";
import { useContextSelector } from "use-context-selector";
import MainLayout from "../../layouts/MainLayout";
import TrackList from "../../components/TrackList/TrackList";
import Link from "next/link";
import { DarkModeContext } from "../../context/ThemesContext";
import styles from "../../styles/track/TrackIndex.module.scss";
import MySelect from "../../components/MySelect/MySelect";
import ErrorData from "../../components/ErrorData/ErrorData";
import useSearch from "../../hooks/useSearch";

const Index = () => {
    const {
        error,
        query,
        serverTracks,
        selectedSort,
        search,
        sortTracks,
        isFetching,
        currentData
    } = useSearch();

    const darkMode = useContextSelector(DarkModeContext,
        (state) => state.darkMode);


    if (error) {
        return <ErrorData/>;
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
