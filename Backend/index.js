const express = require("express");
const { sequelize } = require("./config/db");
const { userRouter } = require("./routes/userRouter");
const { blogRouter } = require("./routes/blogRouter");
const { commentRouter } = require("./routes/commentRouter");
const cors = require("cors");
const { User } = require("./models/userModel");
const port = process.env.PORT;
const app = express();
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Blog Application",
      version: "1.0.0",
    },
  },
  apis: ["./routes/*.js"], // files containing annotations as above
};

const openapiSpecification = swaggerJsdoc(options);

app.use(cors());
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/blog", blogRouter);
app.use("/api/comment", commentRouter);

app.get("/", (req, res) => {
  res.send("<h1>Welcome to the blog application</h1>");
});

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Database synced");
  })
  .catch((error) => {
    console.error("Error syncing database:", error);
  });

app.listen(port, async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to DB");
    console.log(`Listening on port ${port}`);
  } catch (error) {
    console.log("Error:", error);
  }
});
