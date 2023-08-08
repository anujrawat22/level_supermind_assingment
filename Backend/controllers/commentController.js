const { BlogPost } = require("../models/blogModel");
const { Comment } = require("../models/commentModel");
const { User } = require("../models/userModel");

exports.createComment = async (req, res) => {
  const { content, blogId } = req.body;
  const userId = req.user.id;
  try {
    const blogPost = await BlogPost.findByPk(blogId);
    if (!blogPost) {
      return res.status(404).json({ error: "Blog post not found" });
    }
    const newComment = await Comment.create({
      content,
      userId,
      created_at: new Date(),
      blogpostId: blogId,
    });
    res.status(201).json({ msg: "Comment created", data: newComment });
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getAllcomments = async (req, res) => {
  const { blogId } = req.params;
  try {
    const blogPost = await BlogPost.findByPk(blogId, {
      include: [{ model: Comment, include: User }],
    });
    if (!blogPost) {
      return res.status(404).json({ error: "Blog post not found" });
    }

    res
      .status(200)
      .send({ msg: "All comments for the blog", data: blogPost.Comments });
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
