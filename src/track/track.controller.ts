import { TrackService } from "./track.service";
import { Body, Controller, Delete, Get, Param, Post, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { CreateTrackDto } from "./dto/create-track.dto";
import mongoose from "mongoose";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { FileFieldsInterceptor } from "@nestjs/platform-express";

@Controller("/tracks")
export class TrackController {
    constructor( private trackService: TrackService ) {
    }

    @Post()
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'picture', maxCount: 1 },
        { name: 'audio', maxCount: 1 },
    ]))
    create(@UploadedFiles() files, @Body() dto: CreateTrackDto) {
        const {picture, audio} = files;
        return this.trackService.create(dto, picture[0], audio[0]);
    }

    @Get()
    getAllTracks() {
        return this.trackService.getAllTracks();
    }

    @Get(':id')
    getCurrentTrack(@Param('id') id: mongoose.ObjectId) {
        return this.trackService.getCurrentTrack(id);
    }

    @Delete()
    deleteALl() {
        return this.trackService.deleteAllTracks();
    }
    @Delete(':id')
    delete(@Param('id') id: mongoose.ObjectId) {
        return this.trackService.deleteCurrentTrack(id);
    }

    @Post('/comment')
    addComment(@Body() dto: CreateCommentDto) {
        return this.trackService.addComment(dto);
    }
}