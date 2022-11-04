require("dotenv").config();
const postDao = require("../models/postDao");
const error = require("../middlewares/error");
const bcrypt = require("../middlewares/bcrypt");

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

const creatPostService = async (data) => {
  const result = await createResult(data);

  const regex = /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/;
  error.findKeyError(result);
  error.errorOfLength(result.title, 20);
  error.errorOfLength(result.content, 200);
  error.checkPassword(result.password, regex);

  result["password"] = await bcrypt.hashPassword(result["password"]);

  await postDao.createPostDao(result);
};

const getListPostService = async () => {
  const result = await postDao.getList();
  return result;
};

const getPostPostService = async (data) => {
  const value = await data.getPostId();
  error.findKeyError(value);
  const result = await postDao.getPost(value);
  return result;
};

const isRight = async (data) => {
  const password = await data.getBody().password;
  const postId = await data.getPostId();

  const isRight = await bcrypt.isRightPassword(password, postId);

  if (isRight === false) {
    throw new error.BaseError("key_error", 403, "invalid_password");
  }

  return postId;
};

const updatePostService = async (data) => {
  const postId = await isRight(data);
  const contentOfUpdate = await data.getContentOfUpdate();

  error.findKeyError(postId);

  await postDao.updatePost(postId, contentOfUpdate);
};

module.exports = {
  creatPostService,
  getListPostService,
  getPostPostService,
  updatePostService,
};
