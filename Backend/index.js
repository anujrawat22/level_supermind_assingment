const express = require("express");
const { sequelize } = require("./config/db");
const { userRouter } = require("./routes/userRouter");
const port = process.env.PORT;
const app = express();

app.use(express.json());

app.use("/api/user", userRouter);


app.listen(port, async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to DB");
    console.log(`Listening on port ${port}`);
  } catch (error) {
    console.log("Error:", error);
  }
});
