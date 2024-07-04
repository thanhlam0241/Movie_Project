require("dotenv").config();
const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const userSchema = require("../model/admin");

const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
};

const login = async (req, res, next) => {
  const user = await userSchema.findOne({ username: req.body.username });
  if (!user) {
    return res
      .status(404)
      .send(`Can't find user with username "${req.body.username}" `);
  }
  try {
    if (req.body.password === user.password) {
      const accessToken = generateAccessToken({
        _id: user._id,
        username: user.username,
        role: user.role,
      });
      return res.json({
        accessToken: accessToken,
      });
    } else {
      throw createError.Conflict("Password is incorrect");
    }
  } catch (err) {
    if (err.isJoi === true) {
      err.status = 422;
    }
    next(err);
  }
};

module.exports = {
  loginAdmin: login,
};
