import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
      index: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    email: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: false,
    },
    avatar: {
      type: String,
      required: false,
    },
  },
  {
    toJSON: {
      transform: function (doc: any, ret: any) {
        delete ret._id;
      },
    },
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
