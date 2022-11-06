/**
 * Module dependencies.
 */

const postService = require("../services/postService");
const requestData = require("../middlewares/container");

/**
 * 게시글 읽기 컨트롤러: req 를 service 로 넘겨주는 역할. res 를 조작함.
 * @param {request} req
 * @param {response} res
 */

const creatPostController = async (req, res) => {
  await postService.creatPostService(new requestData(req));
  res.status(201).json({ message: "success" });
};

/**
 * 게시글 리스트 불러오기 컨트롤러: req 를 service 로 넘겨주는 역할. res 를 조작함.
 * @param {request} req
 * @param {response} res
 */

const getListController = async (req, res) => {
  const result = await postService.getListPostService();
  res.status(200).json({ result });
};

/**
 * 게시글  상세 읽기 컨트롤러: req 를 service 로 넘겨주는 역할. res 를 조작함.
 * @param {request} req
 * @param {response} res
 */

const getPostController = async (req, res) => {
  const result = await postService.getPostPostService(new requestData(req));
  res.status(200).json({ result });
};

/**
 * 게시글 수정하기 컨트롤러: req 를 service 로 넘겨주는 역할. res 를 조작함.
 * @param {request} req
 * @param {response} res
 */

const updatePostController = async (req, res) => {
  await postService.updatePostService(new requestData(req));
  res.status(201).json({ message: "success" });
};

/**
 * 게시글 삭제하기 컨트롤러(hard delete): req 를 service 로 넘겨주는 역할. res 를 조작함.
 * @param {request} req
 * @param {response} res
 */

const deletePostController = async (req, res) => {
  await postService.deletePostService(new requestData(req));
  res.status(204).json();
};

/**
 * Module exports.
 * @public
 */

module.exports = {
  creatPostController,
  getListController,
  getPostController,
  updatePostController,
  deletePostController,
};
