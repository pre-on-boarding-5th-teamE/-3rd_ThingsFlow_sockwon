require("dotenv").config();
const postDao = require("../models/postDao");
const error = require("../middlewares/error");
const bcrypt = require("../middlewares/bcrypt");

const creatPostService = async (data) => {
  const result = await data.createResult();

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

const isRight = async (data, postId) => {
  const password = await data.getBody().password;

  const isRight = await bcrypt.isRightPassword(password, postId);

  if (isRight === false) {
    throw new error.BaseError("key_error", 403, "invalid_password");
  }
};

const isExist = async (table, postId) => {
  const exist = await postDao.isExistId(table, postId);
  if (!exist) throw new error.BaseError("none", 404, "not_found");
};

const updatePostService = async (data) => {
  const postId = data.getPostId();

  await isExist("posts", postId);
  await isRight(data, postId);

  error.findKeyError(postId);
  const contentOfUpdate = await data.getContentOfUpdate();

  await postDao.updatePost(postId, contentOfUpdate);
};

const deletePostService = async (data) => {
  const postId = data.getPostId();

  await isExist("posts", postId);
  await isRight(data, postId);

  error.findKeyError(postId);

  await postDao.deletePost(postId);
};

module.exports = {
  creatPostService,
  getListPostService,
  getPostPostService,
  updatePostService,
  deletePostService,
};
