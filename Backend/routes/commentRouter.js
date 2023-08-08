const { Router } = require("express");
const { authenticate } = require("../middlewares/authentication");
const {
  createComment,
  getAllcomments,
} = require("../controllers/commentController");

const commentRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Comment
 *   description: Comment management
 * 
 * definitions:
 *   Comment:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *       content:
 *         type: string
 *       userId:
 *         type: integer
 *       blogpostId:
 *         type: integer
 *       created_at:
 *         type: string
 *         format: date-time
 * 
 * /api/comment/create:
 *   post:
 *     summary: Create a new comment
 *     tags: [Comment]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               content:
 *                 type: string
 *               blogId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Comment created successfully
 *       404:
 *         description: Blog post not found
 *       500:
 *         description: Internal server error
 * 
 * /api/comment/{blogId}:
 *   get:
 *     summary: Get all comments for a blog post
 *     tags: [Comment]
 *     parameters:
 *       - name: blogId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of comments for the blog post
 *       404:
 *         description: Blog post not found
 *       500:
 *         description: Internal server error
 */


commentRouter.post("/create", authenticate, createComment);

commentRouter.get("/:blogId", getAllcomments);


module.exports = { commentRouter };
