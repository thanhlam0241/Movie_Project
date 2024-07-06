require("dotenv").config();
const adminSchema = require("../model/admin.js");

const createAdmin = async (data) => {
  const account = await adminSchema.exists({ username: data.username });

  if (account) {
    throw new Error("Account admin already exists");
  }

  return await adminSchema.create(data);
};

const getById = async (id) => {
  const account = await adminSchema.findOne({ _id: id });
  if (!account) {
    throw new Error("Account admin not found");
  }

  return account;
};

const getList = async (username, page = 1, size = 10) => {
  const countDocuments = await adminSchema.countDocuments({
    createdBy: username,
  });
  const accounts = await adminSchema
    .find({ createdBy: username })
    .select("id name username email country -_id")
    .skip(size * (page - 1))
    .limit(size);
  if (!accounts || accounts.length === 0) {
    return {
      page,
      size: size,
      results: [],
      total_results: 0,
      total_pages: 0,
    };
  }

  return {
    page,
    size: size,
    results: accounts,
    total_results: countDocuments,
    total_pages: Math.ceil(countDocuments / size),
  };
};

const getByUsername = async (username) => {
  const account = await adminSchema.exists({ username: username });

  if (!account) {
    throw new Error("Account admin not found");
  }

  return account;
};

const changeInfo = async (id, info) => {
  const account = await adminSchema.exists({ _id: id });

  if (!account) {
    throw new Error("Account admin not found");
  }

  const result = await adminSchema.updateOne({ _id: id }, info);
  return result;
};

const deleteById = async (myId, idDelete) => {
  const account = await adminSchema.exists({ _id: idDelete });

  if (!account) {
    throw new Error("Account admin not found");
  }

  if (account._id === myId || account.createdBy !== myId) {
    throw new Error("You can't delete this admin account");
  }

  await userSchema.deleteOne({ _id: id });
};

module.exports = {
  getById,
  getByUsername,
  changeInfo,
  deleteById,
  getList,
  createAdmin,
};
