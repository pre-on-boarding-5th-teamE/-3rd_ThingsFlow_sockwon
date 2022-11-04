require("dotenv").config();
const postDao = require("../models/postDao");
const error = require("../middlewares/error");
const bcrypt = require("bcrypt");

const checkError = (result) => {
  const regex = /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/;
  error.findKeyError(result);
  error.errorOfLength(result.title, 20);
  error.errorOfLength(result.content, 200);
  error.checkPassword(result.password, regex);
};

const createResult = async (data) => {
  const { title, content, password } = data.getBody();
  const weather = await data.getWeather();
  const result = {
    weather,
    title,
    content,
    password,
  };
  return result;
};

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUND));
  return await bcrypt.hash(password, salt);
};

const isRightPass = async (password) => {};

const creatPostService = async (data) => {
  const result = await createResult(data);

  checkError(result);
  result["password"] = await hashPassword(result["password"]);

  await postDao.createPostDao(result);
};

const getListPostService = async () => {
  const result = await postDao.getList();
  return result;
};

module.exports = {
  creatPostService,
  getListPostService,
};