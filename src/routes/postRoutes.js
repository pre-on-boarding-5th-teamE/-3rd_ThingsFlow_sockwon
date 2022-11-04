const express = require("express");
const router = express.Router();
const postController = require("../controllers/postConteroller");
const { errorHandlerAsync } = require("../middlewares/errorHandler");

router.post("/", errorHandlerAsync(postController.creatPostController));

router.get("/", errorHandlerAsync(postController.getListController));

router.get("/:postId", errorHandlerAsync(postController.getPostController));

router.patch(
  "/:postId",
  errorHandlerAsync(postController.updatePostController)
);

module.exports = {
  router,
};
