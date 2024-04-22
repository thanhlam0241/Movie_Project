import { model, Schema, Document } from "mongoose";

export interface ICredit extends Document {
  id: Number;
  cast: Array<Number>;
  crew: Array<Number>;
}

const CreditSchema: Schema = new Schema({
  id: {
    type: Number,
    required: true,
    indexedDB: true,
  },
  cast: {
    type: Array,
    required: true,
  },
  crew: {
    type: Array,
    required: true,
  },
});

const Credit = model<ICredit>("Credit", CreditSchema);

export default Credit;
