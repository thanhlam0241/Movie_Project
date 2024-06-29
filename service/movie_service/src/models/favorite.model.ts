import { model, Schema, Document } from "mongoose";

export interface IFavorite extends Document {
  user_id: Number;
  movies: Array<Number>;
}

export const FavoriteSchema: Schema = new Schema({
  user_id: {
    type: Number,
    required: true,
    indexedDB: true,
  },
  movies: {
    type: Array,
    required: true,
  },
});

const Favorite = model<IFavorite>("Favorite", FavoriteSchema);

export default Favorite;
