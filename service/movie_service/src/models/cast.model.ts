import { model, Schema, Document } from "mongoose";

export interface ICast extends Document {
  character: String;
  order: Number;
  person_id: Number;
  movie_id: Number;
}

export const CastSchema: Schema = new Schema({
  character: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
    required: true,
  },
  person_id: {
    type: Number,
    required: true,
  },
  movie_id: {
    type: Number,
    required: true,
  },
});

const Cast = model<ICast>("Cast", CastSchema);

export default Cast;
