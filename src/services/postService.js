const postDao = require("../models/postDao");
const error = require("../middlewares/error");

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

const creatPostService = async (data) => {
  const result = await createResult(data);

  checkError(result);

  await postDao.createPostDao(result);
};

module.exports = {
  creatPostService,
};
