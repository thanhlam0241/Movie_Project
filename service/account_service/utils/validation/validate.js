const mongoose = require("mongoose");

const convertToObjectId = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid id");
  }
  return mongoose.Types.ObjectId.createFromHexString(id);
};

module.exports = { convertToObjectId };
