const express = require("express");
const router = express.Router();

const {
  getAdminById,
  getAdminByUsername,
  changeInformation,
  deleteAdmin,
  getListAdmin,
} = require("../controller/admin.controller");

router.route("/username/:username").get(getAdminByUsername);

router.route("/:id").get(getAdminById).delete(deleteAdmin);

router.route("/information/:id").patch(changeInformation);

router.route("/manage/:id").get(getListAdmin);

module.exports = router;
