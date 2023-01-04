import { TrackService } from "./track.service";
import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { CreateTrackDto } from "./dto/create-track.dto";
import mongoose from "mongoose";
import { CreateCommentDto } from "./dto/create-comment.dto";

@Controller("/tracks")
export class TrackController {
    constructor( private trackService: TrackService ) {
    }

    @Post()
    create(@Body() dto: CreateTrackDto) {
        return this.trackService.create(dto);
    }

    @Get()
    getAllTracks() {
        return this.trackService.getAllTracks();
    }

    @Get(':id')
    getCurrentTrack(@Param('id') id: mongoose.ObjectId) {
        return this.trackService.getCurrentTrack(id);
    }

    @Delete(':id')
    delete(@Param('id') id: mongoose.ObjectId) {
        return this.trackService.delete(id);
    }

    @Post('/comment')
    addComment(@Body() dto: CreateCommentDto) {
        return this.trackService.addComment(dto)
    }
}