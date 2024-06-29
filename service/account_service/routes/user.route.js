const express = require("express");
const router = express.Router();

const {
  getUserById,
  getUserByUsername,
  changeInformation,
  deleteUser,
  getDataUserById,
} = require("../controller/user.controller");
const { loginUser, registerUser } = require("../controller/authUser");

router.route("/login").post(loginUser);
router.route("/register").post(registerUser);

router.route("/username/:username").get(getUserByUsername);

router.route("/:id").get(getUserById).delete(deleteUser);
router.route("/public/:id").get(getDataUserById);

router.route("/information/:id").patch(changeInformation);

module.exports = router;
