/**
 * Module dependencies.
 */

const bcrypt = require("bcrypt");
const postDao = require("../models/postDao");

/**
 * 사용자가 입력한 비밀번호를 bcrypt 모듈의 해시값으로 전환.
 * @param {string} password
 * @returns {string}
 */

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUND));
  return await bcrypt.hash(password, salt);
};

/**
 * 게시글 삭제, 수정 하기 위해 비밀번호를 입력했을 때 옳은 비밀번호인지 확인함.
 * @param {string} password
 * @param {number} postId
 * @returns {0 | 1 }
 */

const isRightPassword = async (password, postId) => {
  const hashed = await postDao.getPassword(postId);
  const isRight = await bcrypt.compare(password, hashed[0]["posts_password"]);

  return isRight;
};

/**
 * Module exports.
 * @public
 */

module.exports = {
  hashPassword,
  isRightPassword,
};
