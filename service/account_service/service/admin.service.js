require("dotenv").config();
const adminSchema = require("../model/admin.js");

const getById = async (id) => {
  const account = await adminSchema.findOne({ id: id });
  if (!account) {
    throw new Error("Account admin not found");
  }

  return account;
};

const getList = async (id) => {
  const accounts = await adminSchema.findMany({ createdBy: id });

  if (!accounts || accounts.length === 0) {
    throw new Error("Not found any admin account managed by you");
  }

  return accounts;
};

const getByUsername = async (username) => {
  const account = await adminSchema.exists({ username: username });

  if (!account) {
    throw new Error("Account admin not found");
  }

  return account;
};

const changeInfo = async (id, info) => {
  const account = await adminSchema.exists({ id: id });

  if (!account) {
    throw new Error("Account admin not found");
  }

  const result = await adminSchema.updateOne({ id: id }, info);
  return result;
};

const deleteById = async (myId, idDelete) => {
  const account = await adminSchema.exists({ id: idDelete });

  if (!account) {
    throw new Error("Account admin not found");
  }

  if (account.id === myId || account.createdBy !== myId) {
    throw new Error("You can't delete this admin account");
  }

  await userSchema.deleteOne({ id: id });
};

module.exports = {
  getById,
  getByUsername,
  changeInfo,
  deleteById,
  getList,
};
