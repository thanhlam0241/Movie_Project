require("dotenv").config();
const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const userSchema = require("../model/user");

const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
};

const registerUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const isExist = await userSchema.findOne({ username });
    if (isExist) {
      throw createError.Conflict(`${username} is already registered`);
    }
    const maxIdUser = await userSchema.find().sort({ id: -1 }).limit(1);
    if (maxIdUser.length === 0) {
      maxIdUser.push({ id: 0 });
    }
    const user = await userSchema.create({
      username,
      password,
      id: maxIdUser[0].id + 1,
    });

    return res.status(201).json({ user });
  } catch (err) {
    if (err.isJoi === true) {
      err.status = 422;
    }
    next(err);
  }
};

const loginUser = async (req, res, next) => {
  const user = await userSchema.findOne({ username: req.body.username });
  if (!user) {
    return res
      .status(404)
      .send(`Can't find user with username "${req.body.username}" `);
  }
  try {
    if (req.body.password === user.password) {
      const accessToken = generateAccessToken({
        id: user.id,
        username: user.username,
        avatar: user.avatar,
      });
      return res.json({
        accessToken: accessToken,
        id: user.id,
        username: user.username,
        avatar: user.avatar,
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
  loginUser,
  registerUser,
};
