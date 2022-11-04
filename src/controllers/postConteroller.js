const postService = require("../services/postService");
const requestData = require("../middlewares/container");

const creatPostController = async (req, res) => {
  await postService.creatPostService(new requestData(req));
  res.status(201).json({ message: "success" });
};

const getListController = async (req, res) => {
  const result = await postService.getListPostService();
  res.status(200).json({ result });
};

const getPostController = async (req, res) => {
  const result = await postService.getPostPostService(new requestData(req));
  res.status(200).json({ result });
};

const updatePostController = async (req, res) => {
  await postService.updatePostService(new requestData(req));
  res.status(201).json({ message: "success" });
};

module.exports = {
  creatPostController,
  getListController,
  getPostController,
  updatePostController,
};
