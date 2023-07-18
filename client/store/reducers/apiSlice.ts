import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/"
    }),
    refetchOnReconnect: true,
    tagTypes: [ "Tracks", "Comments" ],
    endpoints: build => ({
        getTracks: build.query({
            query: () => "tracks/"
        }),

        // A query endpoint with an argument
        searchTracks: build.query({
            query: ({query, selectedSort, offset, count}) => `tracks/search?query=${query}&sort=${selectedSort}&offset=${offset}&count=${count}`,
            providesTags: [ "Tracks" ]
        }),

        deleteTrack: build.mutation(({
            query: (id: string) => ({
                url: "/tracks/" + id,
                method: "DELETE",
                body: id
            }),
            invalidatesTags: [ "Tracks" ]
        })),

        addTrack: build.mutation(({
            query: (track: FormData) => ({
                url: "/tracks",
                method: "POST",
                body: track
            }),
            invalidatesTags: [ "Tracks" ]
        })),

        addListen: build.mutation(({
            query: (id: string) => ({
                url: "/tracks/listen/" + id,
                method: "POST",
                body: id
            })
        })),

        getAllComments: build.query(({
            query: (id: string) => ({
                url: "/tracks/" + id + "/comments",
            }),
            providesTags: [ "Comments" ]
        })),

        addComment: build.mutation(({
            query: (comment) => ({
                url: "/tracks/comment",
                method: "POST",
                body: comment
            }),
            invalidatesTags: [ "Comments" ]
        })),

        deleteComment: build.mutation(({
            query: ({trackId, commentId}) => ({
                url: "/tracks/" + trackId + "/comments/" + commentId,
                method: "DELETE"
            }),
            invalidatesTags: [ "Comments" ]
        }))
    } )
});

export const {
    useSearchTracksQuery,
    useAddTrackMutation,
    useDeleteTrackMutation,
    useAddListenMutation,
    useGetAllCommentsQuery,
    useAddCommentMutation,
    useDeleteCommentMutation,
} = api;
