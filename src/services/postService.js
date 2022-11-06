/**
 * Module dependencies.
 */

require("dotenv").config();
const postDao = require("../models/postDao");
const error = require("../middlewares/error");
const bcrypt = require("../middlewares/bcrypt");

/**
 * 게시물의 비밀번호와 일치하는지 검사한다.
 * @param {object} data
 * @param {number} postId
 */

const isRight = async (data, postId) => {
  const password = await data.getBody().password;

  const isRight = await bcrypt.isRightPassword(password, postId);

  if (isRight === false) {
    throw new error.BaseError("key_error", 403, "invalid_password");
  }
};

/**
 * 게시물이 존재하는지 검사
 * @param {string} table
 * @param {number} postId
 */

const isExist = async (table, postId) => {
  const exist = await postDao.isExistId(table, postId);
  if (!exist) throw new error.BaseError("none", 404, "not_found");
};

/**
 * 게시글 쓰기
 * @param {object} data
 */

const creatPostService = async (data) => {
  const result = await data.createResult();

  const regex = /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/;
  error.findKeyError(result);
  error.errorOfLength(result.title, 20);
  error.errorOfLength(result.content, 200);
  error.checkPassword(result.password, regex);

  //await 필요함
  result["password"] = await bcrypt.hashPassword(result["password"]);

  await postDao.createPostDao(result);
};

/**
 * 게시글 전체 리스트 가져오기
 * @returns {object}
 */

const getListPostService = async () => {
  const result = await postDao.getList();
  return result;
};

/**
 *
 * @param {object} data
 * @returns {object}
 */

const getPostPostService = async (data) => {
  const postId = await data.getPostId();

  error.findKeyError(postId);
  await isExist("posts", postId);

  const result = await postDao.getPost(postId);
  return result;
};

/**
 * 게시글 수정. 비밀번호가 일치하지 않으면 에러를 던진다.
 * @param {object} data
 */

const updatePostService = async (data) => {
  const postId = data.getPostId();
  error.findKeyError(postId);

  await isExist("posts", postId);
  await isRight(data, postId);

  const contentOfUpdate = await data.getContentOfUpdate();

  await postDao.updatePost(postId, contentOfUpdate);
};

/**
 * 게시글 삭제하기. 비밀번호 일치하지 않으면 에러를 던진다.
 * @param {object} data
 */

const deletePostService = async (data) => {
  const postId = data.getPostId();
  error.findKeyError(postId);

  await isExist("posts", postId);
  await isRight(data, postId);

  const temp = await postDao.deletePost(postId);
  console.log(temp);
};

/**
 * Module exports.
 * @public
 */

module.exports = {
  creatPostService,
  getListPostService,
  getPostPostService,
  updatePostService,
  deletePostService,
};
