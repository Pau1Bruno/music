import { TrackService } from "./track.service";
import { Body, Controller, Delete, Get, Param, Post, Query, UploadedFiles, UseInterceptors, } from "@nestjs/common";
import { CreateTrackDto } from "./dto/create-track.dto";
import mongoose from "mongoose";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { Public } from "../decorators/public";

@Controller("/tracks")
export class TrackController {
    constructor(private trackService: TrackService) {
    }

    @Post()
    @UseInterceptors(
        FileFieldsInterceptor([
            {name: "picture", maxCount: 1},
            {name: "audio", maxCount: 1},
        ])
    )
    create(@UploadedFiles() files, @Body() dto: CreateTrackDto) {
        const {picture, audio} = files;
        return this.trackService.create(dto, picture[0], audio[0]);
    }

    @Public()
    @Get()
    getAllTracks(@Query("count") count: number, @Query("offset") offset: number) {
        return this.trackService.getAllTracks(count, offset);
    }

    @Public()
    @Get("/search")
    search(@Query("query") query: string, @Query("sort") sort: string) {
        return this.trackService.search(query, sort);
    }

    @Get(":id")
    getCurrentTrack(@Param("id") id: mongoose.ObjectId) {
        return this.trackService.getCurrentTrack(id);
    }

    @Delete()
    deleteALl() {
        return this.trackService.deleteAllTracks();
    }

    @Delete(":id")
    delete(@Param("id") id: mongoose.ObjectId) {
        return this.trackService.deleteCurrentTrack(id);
    }

    @Post("/comment")
    addComment(@Body() dto: CreateCommentDto) {
        return this.trackService.addComment(dto);
    }

    @Post("listen/:id")
    listen(@Param("id") id: mongoose.ObjectId) {
        return this.trackService.listen(id);
    }

    @Get(":id/comments/")
    getAllComments(@Param("id") id: mongoose.ObjectId) {
        return this.trackService.getAllComments(id);
    }

    @Delete(":trackId/comments/:commId")
    deleteCurrentComment(
        @Param("trackId") trackId: mongoose.ObjectId,
        @Param("commId") commId: mongoose.ObjectId
    ) {
        return this.trackService.deleteCurrentComment(trackId, commId);
    }
}
