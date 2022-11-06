/**
 * Module dependencies.
 */

const express = require("express");
const router = express.Router();
const postController = require("../controllers/postConteroller");
const { errorHandlerAsync } = require("../middlewares/errorHandler");

//errorHandlerAsync 는 포함된 함수를 try catch 로 감싸고 있다. 에러가 던져질 경우 잡는다.

router.post("/", errorHandlerAsync(postController.creatPostController));

router.get("/", errorHandlerAsync(postController.getListController));

router.get("/:postId", errorHandlerAsync(postController.getPostController));

router.patch(
  "/:postId",
  errorHandlerAsync(postController.updatePostController)
);

router.delete(
  "/:postId",
  errorHandlerAsync(postController.deletePostController)
);

/**
 * Module exports.
 * @public
 */

module.exports = {
  router,
};
