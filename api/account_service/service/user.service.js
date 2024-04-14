require('dotenv').config();
const userSchema = require('../model/user.js');

const getById = async (id) => {
    const account = await userSchema.findOne({ 'id': id });
    if (!account) {
        throw new Error("Account not found");
    }

    return account;
}

const getByUsername = async (username) => {
    const account = await userSchema.exists({ username: username });

    if (!account) {
        throw new Error("Account not found");
    }

    return account;
}

const changeInfo = async (id, info) => {
    const account = await userSchema.exists({ id: id });

    if (!account) {
        throw new Error("Account not found");
    }

    const result = await userSchema.updateOne({ id: id }, info)
    console.log(id, result, info)
    return result
}

const deleteById = async (id) => {
    const account = await userSchema.exists({ id: id });

    if (!account) {
        throw new Error("Account not found");
    }

    await userSchema.deleteOne({ id: id });
}

module.exports = {
    getById,
    getByUsername,
    changeInfo,
    deleteById
}