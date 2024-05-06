import { model, Schema, Document } from "mongoose";

export interface IReview extends Document {
  user_id: Number;
  movie_id: Number;
  rating: Number;
  review: String;
  date: Date;
}

const ReviewSchema: Schema = new Schema({
  user_id: {
    type: Number,
    required: true,
    indexedDB: true,
  },
  movie_id: {
    type: Number,
    required: true,
    indexedDB: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const Review = model<IReview>("Review", ReviewSchema);

export default Review;
