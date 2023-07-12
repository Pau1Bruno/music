import React from 'react';
import MainLayout from "../../layouts/MainLayout";
import styles from "./ErrorData.module.scss"
import { useContextSelector } from "use-context-selector";
import { DarkModeContext } from "../../context/ThemesContext";

const ErrorData = () => {
    const darkMode = useContextSelector(DarkModeContext,
        (state) => state.darkMode)



    return (
        <MainLayout title={"Error server data"}>
            <div className={darkMode ? styles.dark : styles.light}>
                <div className={styles.container}>
                    <h1>Ошибка при загрузке треков :(</h1>
                </div>
            </div>
        </MainLayout>
    );
};

export default ErrorData;