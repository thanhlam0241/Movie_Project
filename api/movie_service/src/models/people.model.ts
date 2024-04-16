import { model, Schema, Document } from "mongoose";

export interface IPeople extends Document {
  biography: String;
  birthday: String;
  deathday: String;
  gender: Number;
  id: Number;
  imdb_id: String;
  job: String;
  name: String;
  place_of_birth: String;
  image: String;
}

const PeopleSchema: Schema = new Schema({
  id: {
    type: Number,
    required: true,
    indexedDB: true,
  },
  name: {
    type: String,
    required: true,
  },
  biography: {
    type: String,
    required: false,
  },
  birthday: {
    type: String,
    required: false,
  },
  deathday: {
    type: String,
    required: false,
  },
  gender: {
    type: Number,
    required: false,
  },
  imdb_id: {
    type: String,
    required: false,
  },
  job: {
    type: String,
    required: false,
  },
  place_of_birth: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
});

const People = model<IPeople>("People", PeopleSchema);

export default People;
