const userModel = require("../models/userModel");
const { validationResult } = require("express-validator");
const userServices = require("../services/userServices");
const { get } = require("mongoose");

const register = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password } = req.body;
  const hashedPassword = await userModel.hashPassword(password);

  try {
    const user = await userServices.createUser({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password: hashedPassword,
    });

    const token = await user.generateAuthToken();

    res.status(201).json({ user, token });
  } catch (err) {
    console.log(err);
  }
};

const login = async (req, res, next) => {
   const errors = validationResult(req);
  
   if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
   }

   const { email, password } = req.body;

   const user = await userModel.findOne({ email }).select("+password");

   if (!user) {
     return res.status(401).json({ error: "Invalid email or password" });
   }

   const isMatch = await user.comparePassword(password);

   if (!isMatch) {
     return res.status(401).json({ error: "Invalid email or password" });
   }

   const token = await user.generateAuthToken();

   res.status(200).json({ user, token });
};

const getUserprofile = async (req, res, next) => {
  const user = req.user;
  res.status(200).json({ user });
};


module.exports = {
  register,
  login,
  getUserprofile
};
