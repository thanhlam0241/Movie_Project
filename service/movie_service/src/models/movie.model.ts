import { model, Schema, Document } from "mongoose";

export interface IMovie extends Document {
  id: Number;
  title: String;
  genres: Array<Number>;
  overview: String;
  poster_path: String;
  backdrop_path: String;
  release_date: Date;
  revenue: Number;
  budget: Number;
  runtime: Number;
  status: String;
  video_path: String;
  popularity: GLfloat;
  vote_average: GLfloat;
  vote_count: GLfloat;
  view: GLfloat;
}

const MovieSchema: Schema = new Schema({
  id: {
    type: Number,
    required: true,
    indexedDB: true,
    default: 0,
  },
  title: {
    type: String,
    required: true,
    default: "",
  },
  genres: {
    type: Array,
    required: true,
  },
  overview: {
    type: String,
    required: false,
  },
  backdrop_path: {
    type: String,
    required: false,
  },
  poster_path: {
    type: String,
    required: false,
  },
  release_date: {
    type: Date,
    required: false,
    default: Date.now(),
  },
  view: {
    type: Number,
    required: false,
    default: 0,
  },
  revenue: {
    type: Number,
    required: false,
    default: 0,
  },
  budget: {
    type: Number,
    required: false,
    default: 0,
  },
  status: {
    type: String,
    required: false,
  },
  popularity: {
    type: Number,
    required: false,
    default: 0,
  },
  runtime: {
    type: Number,
    required: false,
    default: 0,
  },
  vote_average: {
    type: Number,
    required: false,
    default: 0,
  },
  vote_count: {
    type: Number,
    required: false,
    default: 0,
  },
  video_path: {
    type: String,
    required: false,
  },
});

MovieSchema.index({ id: -1 });
MovieSchema.index({ title: "text" });

const Movie = model<IMovie>("Movie", MovieSchema);

export default Movie;
