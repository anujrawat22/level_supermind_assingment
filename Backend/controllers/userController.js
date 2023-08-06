const { User } = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { email, password, username, contact } = req.body;
  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedpassword = await bcrypt.hash(password, 5);

    const newUser = await User.create({
      username,
      email,
      password: hashedpassword,
      contact,
    });

    res.status(201).json({ msg: "Registeration succesfull", data: newUser });
  } catch (error) {
    console.error("Error creating user: ", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if the email exists in the database
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Compare password using the instance method from the User model
    const isValidPassword = bcrypt.compareSync(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const token = jwt.sign({ userId: user.id }, process.env.secret_key, {
      expiresIn: 60 * 60 * 24 * 7,
    });

    res.cookie("token", token);

    res.status(200).json({ msg: "Login successful", token });
  } catch (err) {
    console.error("Error logging in: ", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
