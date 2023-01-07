import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Track, TrackDocument } from "./schemas/track.schema";
import mongoose, { Model } from "mongoose";
import { Comment, CommentDocument } from "./schemas/comment.schema";
import { CreateTrackDto } from "./dto/create-track.dto";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { FileService, FileType } from "../file/file.service";

@Injectable()
export class TrackService {
    constructor( @InjectModel(Track.name) private trackModel: Model<TrackDocument>, // needed for using model in our service
                 @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
                 private fileService: FileService) {} // to pass to it use "this"
    async create(dto: CreateTrackDto, picture, audio): Promise<Track> {
        const picturePath = this.fileService.createFile(FileType.IMAGE, picture);
        const audioPath = this.fileService.createFile(FileType.AUDIO, audio);
        const createdTrack = new this.trackModel({...dto, listens: 0, audio: audioPath, picture: picturePath});
        return createdTrack.save();
    }
    async getAllTracks(): Promise<Track[]> {
        const tracks = await this.trackModel.find();
        return tracks;
    }

    async getCurrentTrack(id: mongoose.ObjectId): Promise<Track> {
        const track = await this.trackModel.findById(id).populate('comments');
        return track;
    }

    async delete(id: mongoose.ObjectId): Promise<mongoose.ObjectId> {
        await this.trackModel.findByIdAndDelete(id);
        return id;
    }

    async addComment(dto: CreateCommentDto): Promise<Comment> {
        const track = await this.trackModel.findById(dto.trackId);
        const comment = await this.commentModel.create({...dto});
        track.comments.push(comment._id);
        await track.save();
        return comment;
    }
}