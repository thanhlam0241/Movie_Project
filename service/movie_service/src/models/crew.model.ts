import { model, Schema, Document } from "mongoose";

export interface ICrew extends Document {
  person_id: Number;
  movie_id: Number;
  department: String;
  job: String;
}

export const CrewSchema: Schema = new Schema({
  person_id: {
    type: Number,
    required: true,
  },
  movie_id: {
    type: Number,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  job: {
    type: String,
    required: true,
  },
});

const Crew = model<ICrew>("Crew", CrewSchema);

export default Crew;
