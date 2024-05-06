import { model, Schema, Document } from "mongoose";

export interface IGenre extends Document {
  id: Number;
  name: String;
  overview: String;
}

const GenreSchema: Schema = new Schema({
  id: {
    type: Number,
    required: true,
    indexedDB: true,
  },
  name: {
    type: String,
    required: true,
  },
  overview: {
    type: String,
    required: false,
  },
});

const Genre = model<IGenre>("Genre", GenreSchema);

export default Genre;
