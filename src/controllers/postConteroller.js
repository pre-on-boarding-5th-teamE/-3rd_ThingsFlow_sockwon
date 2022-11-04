const postService = require("../services/postService");
const requestData = require("../middlewares/container");

const creatPostController = async (req, res) => {
  await postService.creatPostService(new requestData(req));
  res.status(201).json({ message: "success" });
};

module.exports = {
  creatPostController,
};
