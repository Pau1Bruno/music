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
  constructor(
    @InjectModel(Track.name) private trackModel: Model<TrackDocument>, // needed for using model in our service
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    private fileService: FileService
  ) {} // to pass to it use "this"

  async create(dto: CreateTrackDto, picture, audio): Promise<Track> {
    console.log(dto);
    const picturePath = this.fileService.createFile(FileType.IMAGE, picture);
    const audioPath = this.fileService.createFile(FileType.AUDIO, audio);
    const createdTrack = new this.trackModel({
      ...dto,
      listens: 0,
      audio: audioPath,
      picture: picturePath,
    });
    return createdTrack.save();
  }

  async getAllTracks(count = 10, offset = 0): Promise<Track[]> {
    const tracks = await this.trackModel.find().skip(offset).limit(count);
    return tracks;
  }

  async search(query: string, sort: string): Promise<Track[]> {
    const sortedObj = {};
    sortedObj[sort] = "-1";
    const tracks = await this.trackModel
      .find({
        name: { $regex: new RegExp(query, "i") },
      })
      .sort(sortedObj);
    return tracks;
  }

  async getCurrentTrack(id: mongoose.ObjectId): Promise<Track> {
    const track = await this.trackModel.findById(id).populate("comments");
    return track;
  }

  async deleteCurrentTrack(id: mongoose.ObjectId): Promise<mongoose.ObjectId> {
    const track = await this.trackModel.findById(id);
    this.fileService.removeFile(track.audio);
    this.fileService.removeFile(track.picture);
    await this.trackModel.findByIdAndDelete(id);
    return id;
  }

  async deleteAllTracks(): Promise<string> {
    await this.trackModel.deleteMany();
    return "all tracks are deleted";
  }

  async addComment(dto: CreateCommentDto): Promise<Comment> {
    const track = await this.trackModel.findById(dto.trackId);
    const comment = await this.commentModel.create({ ...dto });
    track.comments.push(comment._id);
    await track.save();
    return comment;
  }

  async listen(id: mongoose.ObjectId): Promise<number> {
    const track = await this.trackModel.findById(id);
    track.listens += 1;
    await track.save();
    return track.listens;
  }

  async getAllComments(id: mongoose.ObjectId): Promise<Comment[]> {
    const track = await this.trackModel.findById(id);
    const commIdArr = track.comments.map((e) => e.toString());
    const comments = [];
    for (let i = 0; i < commIdArr.length; i++) {
      comments.push(await this.commentModel.findById(commIdArr[i]));
    }
    return comments;
  }

  async deleteCurrentComment(
    trackId: mongoose.ObjectId,
    commId: mongoose.ObjectId
  ): Promise<Comment> {
    const comment = await this.commentModel.findByIdAndDelete(
      commId.toString()
    );
    await this.trackModel
      .find()
      .update({ trackId }, { $pull: { comments: null } });
    return comment;
  }
}
