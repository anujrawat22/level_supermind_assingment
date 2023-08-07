const { Router } = require("express");
const { register, login, getUser } = require("../controllers/userController");

const userRouter = Router();

userRouter.post("/register",register)

userRouter.post("/login",login)

userRouter.get("/user",getUser)
module.exports = { userRouter };
