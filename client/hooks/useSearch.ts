import React, { useState } from "react";
import { useSearchTracksQuery } from "../store/reducers/apiSlice";

const useSearch = (offset: string) => {
    const [ query, setQuery ] = useState<string>("");
    const [ timer, setTimer ] = useState<null | ReturnType<typeof setTimeout>>(null);
    const [ skip, setSkip ] = useState(false);
    const [ count, setCount ] = useState("5");
    const [ selectedSort, setSelectedSort ] = useState<string>("name");

    const {
        data: serverTracks,
        isFetching,
        currentData,
        error
    } = useSearchTracksQuery({query, selectedSort, offset, count}, {
        skip: skip,
        pollingInterval: 100000
    });

    const sortTracks = (sort: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedSort(sort.target.value);
    };

    const countTracks = (count: React.ChangeEvent<HTMLSelectElement>) => {
        setCount(count.target.value);
    }

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

    return {
        search,
        sortTracks,
        serverTracks,
        isFetching,
        currentData,
        error,
        query,
        selectedSort,
        count,
        countTracks
    }
};

export default useSearch;