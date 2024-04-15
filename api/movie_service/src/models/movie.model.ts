import { model, Schema, Model, Document } from "mongoose";

export interface IMovie extends Document {
  id: Number;
  title: String;
  overview: String;
  backdrop_path: String;
}

const MovieSchema: Schema = new Schema({
  id: {
    type: Number,
    required: true,
    indexedDB: true,
  },
  title: {
    type: String,
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
});

const Movie = model<IMovie>("Movie", MovieSchema);

export default Movie;
