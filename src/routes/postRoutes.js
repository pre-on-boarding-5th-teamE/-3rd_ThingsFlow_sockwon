const express = require("express");
const router = express.Router();
const postController = require("../controllers/postConteroller");
const { errorHandlerAsync } = require("../middlewares/errorHandler");

router.post("/", errorHandlerAsync(postController.creatPostController));

router.get("/", errorHandlerAsync(postController.getListController));

module.exports = {
  router,
};
