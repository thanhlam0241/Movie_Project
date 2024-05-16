import { model, Schema, Document } from "mongoose";

export interface ICompany extends Document {
  id: Number;
  name: String;
  origin_country: String;
  homepage: String;
  description: String;
  logo_path: String;
  headquarters: String;
  parent_company: String;
}

export const CompanySchema: Schema = new Schema({
  id: {
    type: Number,
    required: true,
    indexedDB: true,
  },
  name: {
    type: String,
    required: true,
  },
  origin_country: {
    type: String,
    required: false,
  },
  homepage: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  logo_path: {
    type: String,
    required: false,
  },
  headquarters: {
    type: String,
    required: false,
  },
  parent_company: {
    type: String,
    required: false,
  },
});

const Company = model<ICompany>("Company", CompanySchema);

export default Company;
