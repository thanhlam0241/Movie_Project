const {
  getById,
  getByUsername,
  changeInfo,
  deleteById,
  createAdmin,
  getList,
} = require("../service/admin.service.js");
// const { convertToObjectId } = require("../utils/validation/validate.js");

const createAccount = async (req, res) => {
  try {
    const data = req.body;
    const user = await createAdmin(data);
    return res.status(201).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err.message);
  }
};

const getAdminById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await getById(id);
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};

const getAdminByUsername = async (req, res) => {
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
    const id = req.params.id;
    await changeInfo(id, data);
    return res.status(201).send("Update password successfully");
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const id = req.params.id;
    await deleteById(id);
    return res.status(200).send(`Delete user successfully: ${id}`);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};

const getListAdmin = async (req, res) => {
  try {
    const id = req.params.id;
    const results = await getList(id);
    return res.status(200).json(results);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};

module.exports = {
  getAdminById,
  getAdminByUsername,
  changeInformation,
  deleteAdmin,
  getListAdmin,
  createAccount,
};
