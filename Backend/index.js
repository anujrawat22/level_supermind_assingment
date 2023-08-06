const express = require("express");
const { sequelize } = require("./config/db");
const { userRouter } = require("./routes/userRouter");
const { blogRouter } = require("./routes/blogRouter");
const { commentRouter } = require("./routes/commentRouter");
const cors =require('cors');
const { User } = require("./models/userModel");
const port = process.env.PORT;
const app = express();

app.use(cors())
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/blog", blogRouter);
app.use("/api/comment", commentRouter);
app.get("/destroy",async(req,res)=>{
  try {
    await User.destroy({ where: {} });
    res.json({ message: 'All users have been cleared from the database.' });
    
  } catch (error) {
    console.log(error);
  }
})

app.get("/", (req, res) => {
  res.send("<h1>Hello</h1>");
});

sequelize.sync();

app.listen(port, async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to DB");
    console.log(`Listening on port ${port}`);
  } catch (error) {
    console.log("Error:", error);
  }
});
