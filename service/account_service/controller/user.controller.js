const {
  getById,
  getByUsername,
  changeInfo,
  deleteById,
  search,
  getDataUser,
} = require("../service/user.service.js");

const getUserById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const user = await getById(id);
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};

const searchText = async (req, res) => {
  const body = req.body;
  const searchString = body.search;
  const page = body.page;
  const size = body.size;
  const result = await search(page, size, searchString);
  return res.json(result);
};

const getDataUserById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const user = await getDataUser(id);
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};

const getUserByUsername = async (req, res) => {
  try {
    const user = await getByUsername(req.params.username);
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};

const changeInformation = async (req, res) => {
  try {
    const data = req.body;
    const id = parseInt(req.params.id);
    await changeInfo(id, data);
    return res.status(201).send("Update information successfully");
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await deleteById(id);
    return res.status(200).send(`Delete user successfully: ${id}`);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};

module.exports = {
  getUserById,
  getUserByUsername,
  changeInformation,
  deleteUser,
  getDataUserById,
  searchText,
};
