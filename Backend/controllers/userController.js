const { User } = require("../models/userModel");
const bcrypt = require("bcrypt")

exports.register = async (req, res) => {
  const { email, password, username, contact } = req.body;
  try {
    const existingUser = await User.findOne({ where: { email } });
    if(existingUser){
        return res.status(400).json({error : "User already exists"})
    }

    const hashedpassword = await bcrypt.hash(password, 5);

    const newUser = await User.create({username,email,password : hashedpassword,contact})

    res.status(201).json({msg : "Registeration succesfull",data :newUser})
  } catch (error) {
    console.error('Error creating user: ', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
