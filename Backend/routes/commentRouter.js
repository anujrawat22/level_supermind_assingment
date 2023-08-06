const { Router } = require("express");
const { authenticate } = require("../middlewares/authentication");
const {
  createComment,
  getAllcomments,
} = require("../controllers/commentController");

const commentRouter = Router();

commentRouter.post("/create", authenticate, createComment);

commentRouter.get("/:blogId", getAllcomments);


module.exports = { commentRouter };
