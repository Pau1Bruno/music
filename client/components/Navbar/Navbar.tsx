import React, {useContext} from "react";
import Link from "next/link";
import Brightness6Icon from "@mui/icons-material/Brightness6";
import styles from "./Navbar.module.scss";
import {DarkModeContext} from "../../context/ThemesContext";

const Navbar = () => {
    const { darkMode, setDarkMode } = useContext(DarkModeContext);

    const changingTheme = () => {
        const newTheme = !darkMode;
        setDarkMode(newTheme);
    };

    return (
        <div className={darkMode ? styles.dark : styles.light}>

            <div className={styles.left}>
                <Link href="/">
                    <span>Home</span>
                </Link>
                <Link href="/tracks">
                    <span>Tracks</span>
                </Link>
                <Link href="/albums">
                    <span>Albums</span>
                </Link>
            </div>
            <div className={styles.right}>
                <div className={styles.theme} onClick={changingTheme}>
                    <Brightness6Icon />
                </div>
                <div className={styles.user}>
                    <span>Pavel Ushakov</span>
                </div>
            </div>
        </div>
    );
};

export default Navbar;