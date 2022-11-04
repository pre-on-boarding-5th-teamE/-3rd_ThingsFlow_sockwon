const express = require("express");
const router = express.Router();
const postRouter = require("./postRoutes");

router.use("/api/v1/posts", postRouter.router);

module.exports = router;
