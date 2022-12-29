import { TrackService } from "./track.service";
import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CreateTrackDto } from "./dto/create-track.dto";
import mongoose from "mongoose";

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
}