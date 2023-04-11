import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/"
    }),
    refetchOnFocus: true,
    refetchOnReconnect: true,
    tagTypes: [ "Tracks" ],
    endpoints: build => ( {
        getTracks: build.query({
            query: () => "tracks/"
        }),

        // A query endpoint with an argument
        searchTracks: build.query({
            query: search => `tracks/search?query=${search}`,
            providesTags: [ "Tracks" ]
        }),

        deleteTrack: build.mutation(( {
            query: (id: string) => ( {
                url: "/tracks/" + id,
                method: "DELETE",
                body: id
            } ),
            invalidatesTags: [ "Tracks" ]
        } )),

        addTrack: build.mutation(( {
            query: (track: FormData) => ( {
                url: "/tracks",
                method: "POST",
                body: track
            } ),
            invalidatesTags: [ "Tracks" ]
        } )),

        addListen: build.mutation(( {
            query: (id: string) => ( {
                url: "/tracks/listen/" + id,
                method: "POST",
                body: id
            } )
        } ))
    } )
});

export const { useAddListenMutation, useSearchTracksQuery, useDeleteTrackMutation, useAddTrackMutation } = api;
