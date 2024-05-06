import { model, Schema, Document } from "mongoose";

export interface IHistory extends Document {
  user_id: Number;
  movie_id: Number;
  date: Date;
}

const HistorySchema: Schema = new Schema({
  user_id: {
    type: Number,
    required: true,
    indexedDB: true,
  },
  movie_id: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const History = model<IHistory>("History", HistorySchema);

export default History;
