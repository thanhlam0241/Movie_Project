import { model, Schema, Document } from "mongoose";

export interface IMovie extends Document {
  id: Number;
  imdb_id: String;
  title: String;
  genres: Array<Number>;
  original_language: String;
  original_title: String;
  overview: String;
  poster_path: String;
  backdrop_path: String;
  release_date: String;
  revenue: Number;
  budget: Number;
  spoken_languages: Array<Object>;
  production_countries: Array<Object>;
  production_companies: Array<Number>;
  status: String;
  video: Boolean;
  vote_average: GLfloat;
  vote_count: GLfloat;
}

const MovieSchema: Schema = new Schema({
  id: {
    type: Number,
    required: true,
    indexedDB: true,
  },
  imdb_id: {
    type: String,
    required: false,
  },
  title: {
    type: String,
    required: true,
  },
  genres: {
    type: Array,
    required: true,
  },
  original_language: {
    type: String,
    required: true,
  },
  original_title: {
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
  poster_path: {
    type: String,
    required: false,
  },
  release_date: {
    type: String,
    required: false,
  },
  revenue: {
    type: Number,
    required: false,
  },
  budget: {
    type: Number,
    required: false,
  },
  spoken_languages: {
    type: Array,
    required: false,
  },
  production_countries: {
    type: Array,
    required: false,
  },
  production_companies: {
    type: Array,
    required: false,
  },
  status: {
    type: String,
    required: false,
  },
  video: {
    type: Boolean,
    required: false,
  },
  vote_average: {
    type: Number,
    required: false,
  },
  vote_count: {
    type: Number,
    required: false,
  },
});

const Movie = model<IMovie>("Movie", MovieSchema);

export default Movie;
