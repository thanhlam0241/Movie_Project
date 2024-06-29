require("dotenv").config();
const userSchema = require("../model/user.js");

const getList = async () => {
  const accounts = await userSchema.findMany();

  if (!accounts || accounts.length === 0) {
    throw new Error("Not found any user");
  }

  return accounts;
};

const getDataUser = async (userId) => {
  const account = await userSchema
    .findOne({ id: userId })
    .select("id name avatar")
    .lean();

  if (!account) {
    throw new Error("Not found any user");
  }

  return account;
};

const getById = async (id) => {
  const account = await userSchema.findOne({ id: id });
  if (!account) {
    throw new Error("Account not found");
  }

  return account;
};

const getByUsername = async (username) => {
  const account = await userSchema.findOne({ username: username });

  if (!account) {
    throw new Error("Account not found");
  }

  return account;
};

const changeInfo = async (id, info) => {
  const account = await userSchema.exists({ id: id });

  if (!account) {
    throw new Error("Account not found");
  }

  const result = await userSchema.updateOne({ id: id }, info);
  return result;
};

const deleteById = async (id) => {
  const account = await userSchema.exists({ id: id });

  if (!account) {
    throw new Error("Account not found");
  }

  await userSchema.deleteOne({ id: id });
};

module.exports = {
  getById,
  getByUsername,
  changeInfo,
  deleteById,
  getList,
  getDataUser,
};
