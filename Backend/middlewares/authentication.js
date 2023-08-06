const jwt = require("jsonwebtoken");
const { User } = require("../models/userModel");

const authenticate = async (req, res, next) => {
  const token = req.headers?.authorization?.split(" ")[1];

  try {
    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized : No token provided" });
    }

    const decodedToken = jwt.verify(token, process.env.secret_key);

    const user = await User.findByPk(decodedToken.userId);

    if (!user) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("Authorzation error :", error);
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};

module.exports = { authenticate };
