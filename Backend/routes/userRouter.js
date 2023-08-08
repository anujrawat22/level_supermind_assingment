const { Router } = require("express");
const { register, login, getUser } = require("../controllers/userController");

const userRouter = Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management
 * 
 * definitions:
 *   UserRegister:
 *     type: object
 *     required:
 *       - email
 *       - password
 *       - username
 *     properties:
 *       email:
 *         type: string
 *       password:
 *         type: string
 *       username:
 *         type: string
 *       contact:
 *         type: string
 *       role:
 *         type: string
 * 
 *   UserLogin:
 *     type: object
 *     required:
 *       - email
 *       - password
 *     properties:
 *       email:
 *         type: string
 *       password:
 *         type: string
 * 
 * /api/user/register:
 *   post:
 *     summary: Register a new user
 *     tags: [User]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/UserRegister'
 *     responses:
 *       201:
 *         description: Registration successful
 *       400:
 *         description: User already exists or other validation error
 *       500:
 *         description: Internal server error
 * 
 * /api/user/login:
 *   post:
 *     summary: Authenticate user and get a JWT token
 *     tags: [User]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/UserLogin'
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid password or user not found
 *       500:
 *         description: Internal server error
 */

userRouter.post("/register",register)

userRouter.post("/login",login)


module.exports = { userRouter };
