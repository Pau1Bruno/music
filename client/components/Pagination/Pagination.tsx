import React, { Dispatch, SetStateAction, useMemo, useState } from 'react';
import { useContextSelector } from "use-context-selector";
import { DarkModeContext } from "../../context/ThemesContext";
import styles from "./Pagination.module.scss";
import { useGetAllTracksCountQuery } from "../../store/reducers/apiSlice";

type PaginationProps = {
    count: number,
    setOffset: Dispatch<SetStateAction<string>>,
    tracksCount: any
}

const Pagination = ({count, setOffset, tracksCount}: PaginationProps) => {
    const {data} = useGetAllTracksCountQuery();
    const [ curPage, setCurPage ] = useState(1);
    const darkMode = useContextSelector(DarkModeContext,
        (state) => state.darkMode);


    useMemo(() => {
        curPage === 1
            ? setOffset("0")
            : setOffset(String((curPage - 1) * count));
    }, [count, curPage, setOffset])

    useMemo(() => {
        setCurPage(1);
    }, [count])

    console.log(curPage)
    const pagesCount = Math.ceil(tracksCount / count);
    if (pagesCount === 1) return null;

    const pages = Array.from({length: pagesCount}, (_, i) => i + 1);

    return (
        <div className={darkMode ? styles.dark : styles.light}>
            <div className={styles.container}>
                {pages.map((page, index) =>
                    <div
                        key={index}
                        className={page === curPage ? styles.pageActive : styles.page}
                        onClick={() => setCurPage(page)}
                    >
                        {page}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Pagination;