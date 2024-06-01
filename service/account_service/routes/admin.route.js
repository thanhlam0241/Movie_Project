const express = require("express");
const router = express.Router();

const {
  getAdminById,
  getAdminByUsername,
  changeInformation,
  deleteAdmin,
  getListAdmin,
  createAccount,
} = require("../controller/admin.controller");
const { loginAdmin } = require("../controller/authAdmin");

router.route("/login").post(loginAdmin);

router.route("/").post(createAccount);

router.route("/username/:username").get(getAdminByUsername);

router.route("/:id").get(getAdminById).delete(deleteAdmin);

router.route("/information/:id").patch(changeInformation);

router.route("/manage/:id").get(getListAdmin);

module.exports = router;
