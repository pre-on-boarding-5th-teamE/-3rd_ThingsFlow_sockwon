const bcrypt = require("bcrypt");
const postDao = require("../models/postDao");

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUND));
  return await bcrypt.hash(password, salt);
};

const isRightPassword = async (password, postId) => {
  const hashed = await postDao.getPassword(postId);
  const isRight = await bcrypt.compare(password, hashed[0]["posts_password"]);

  return isRight;
};

module.exports = {
  hashPassword,
  isRightPassword,
};
