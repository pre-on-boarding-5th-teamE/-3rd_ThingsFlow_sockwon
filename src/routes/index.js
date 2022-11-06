/**
 * Module dependencies.
 */

const express = require("express");
const router = express.Router();
const postRouter = require("./postRoutes");

router.use("/api/v1/posts", postRouter.router);

/**
 * Module exports.
 * @public
 */

module.exports = router;
