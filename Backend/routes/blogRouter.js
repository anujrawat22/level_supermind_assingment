const { Router } = require("express");
const {
  allblogs,
  getblogbyid,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
} = require("../controllers/blogController");

const { authenticate } = require("../middlewares/authentication");
const { authorize } = require("../middlewares/authorization");

const blogRouter = Router();

blogRouter.get("/all", allblogs);
blogRouter.get("/:id", getblogbyid);
blogRouter.post("/create", authenticate, authorize(["author"]), createBlogPost);
blogRouter.put(
  "/update/:id",
  authenticate,
  authorize(["admin", "author"]),
  updateBlogPost
);
blogRouter.delete(
  "/delete/:id",
  authenticate,
  authorize(["admin", "author"]),
  deleteBlogPost
);

module.exports = { blogRouter };
