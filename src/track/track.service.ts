import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Track, TrackDocument } from "./schemas/track.schema";
import mongoose, { Model } from "mongoose";
import { Comment, CommentDocument } from "./schemas/comment.schema";
import { CreateTrackDto } from "./dto/create-track.dto";

@Injectable()
export class TrackService {
    constructor( @InjectModel(Track.name) private trackModel: Model<TrackDocument>, // needed for using model in our service
                 @InjectModel(Comment.name) private commentModel: Model<CommentDocument> ) {} // to pass to it use "this"
    async create(dto: CreateTrackDto): Promise<Track> {
        const createdTrack = new this.trackModel({...dto, listens: 0})
        return createdTrack.save();
    }
    async getAllTracks(): Promise<Track[]> {
        return  await this.trackModel.find().exec();
    }

    async getCurrentTrack(id: mongoose.ObjectId): Promise<Track> {
        return this.trackModel.findById(id).exec();
    }

    async delete(id: mongoose.ObjectId): Promise<mongoose.ObjectId> {
        await this.trackModel.findByIdAndDelete(id).exec();
        return id;
    }
}