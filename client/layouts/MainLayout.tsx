import React, {FC, ReactNode} from "react";
import Navbar from "../components/Navbar";
import classes from "../styles/content.module.css";
import Player from "../components/Player";

type MainLayoutProps = {
    children?: ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
    return (
        <>
            <Navbar />
            <div className={classes.content}>
                {children}
            </div>
            <Player />
        </>
    );
};

export default MainLayout;
