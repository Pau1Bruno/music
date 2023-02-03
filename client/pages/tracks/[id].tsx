import React from "react";
import { useRouter } from "next/router";
import MainLayout from "../../layouts/MainLayout";
import { Button, Grid } from "@mui/material";
import styles from "../../styles/track/TrackPage.module.scss";

const TrackPage = () => {
    const router = useRouter();
    const { id } = router.query;

    return (
        <MainLayout>
            <Grid container direction="column" className={styles.track}>
                <Button onClick={ () => router.push("/tracks") }>Return to track list</Button>
                <h1>Track id: { id }</h1>
            </Grid>
        </MainLayout>
    );
};

export default TrackPage;
