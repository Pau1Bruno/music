import React from "react";
import Link from "next/link";
import Brightness6Icon from "@mui/icons-material/Brightness6";
import styles from './Navbar.module.scss';

const Navbar = () => {
    return (
        <div className={styles.navbar}>
            <div className={styles.left}>
                <Link href="/">
                    <span>home</span>
                </Link>

                <Link href="/tracks">
                    <span>all tracks</span>
                </Link>

                <Link href="/albums">
                    <span>all albums</span>
                </Link>
            </div>

            <div className={styles.right}>
                <Brightness6Icon />
                <div className="user">
                    {/*<img src="/ryo.jpg" alt="ryo" />*/}
                    <span>Pavel Ushakov</span>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
