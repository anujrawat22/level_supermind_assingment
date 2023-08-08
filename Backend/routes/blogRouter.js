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

/**
 * @swagger
 * tags:
 *   name: Blog
 *   description: Blog management
 *
 * definitions:
 *   BlogPost:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *       title:
 *         type: string
 *       content:
 *         type: string
 *       authorId:
 *         type: integer
 *
 * /api/blog/all:
 *   get:
 *     summary: Get all blog posts
 *     tags: [Blog]
 *     responses:
 *       200:
 *         description: List of all blog posts
 *       500:
 *         description: Internal server error
 *
 * /api/blog/{id}:
 *   get:
 *     summary: Get a blog post by ID
 *     tags: [Blog]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Blog post retrieved successfully
 *       404:
 *         description: Blog post not found
 *       500:
 *         description: Internal server error
 *
 * /api/blog/create:
 *   post:
 *     summary: Create a new blog post
 *     tags: [Blog]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/BlogPost'
 *     responses:
 *       201:
 *         description: Blog post created successfully
 *       500:
 *         description: Internal server error
 *
 * /api/blog/update/{id}:
 *   put:
 *     summary: Update a blog post
 *     tags: [Blog]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/BlogPost'
 *     responses:
 *       200:
 *         description: Blog post updated successfully
 *       403:
 *         description: Not authorized to update the post
 *       404:
 *         description: Blog post not found
 *       500:
 *         description: Internal server error
 *
 * /api/blog/delete/{id}:
 *   delete:
 *     summary: Delete a blog post
 *     tags: [Blog]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *
 *     responses:
 *       204:
 *         description: Blog post deleted successfully
 *       403:
 *         description: Forbidden - You are not the author of this blog post
 *       404:
 *         description: Blog post not found
 *       500:
 *         description: Internal server error
 */

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
