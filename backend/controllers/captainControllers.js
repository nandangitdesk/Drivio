const captainModel = require("../models/captainModel");
const { validationResult } = require("express-validator");
const { createCaptain } = require("../services/captainServices");
const blacklistTokenModel = require("../models/blacklistTokenModel");

const registerCaptain = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password, vehicle } = req.body;

  const isCaptainAlreadyExist = await captainModel.findOne({ email });

  if (isCaptainAlreadyExist) {
    return res.status(400).json({ error: "Captain already exist" });
  }

  const hashedPassword = await captainModel.hashPassword(password);

  const captain = await createCaptain({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashedPassword,
    color: vehicle.color,
    plate: vehicle.plate,
    capacity: vehicle.capacity,
    vehicleType: vehicle.vehicleType,
  });

  const token = await captain.generateAuthToken();

  res.status(201).json({ captain, token });
};

const loginCaptain = async (req, res, next) => {
  
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }


  const { email, password } = req.body;

  const captain = await captainModel.findOne({ email }).select("+password");

  if (!captain) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const isMatch = await captain.comparePassword(password);

  if (!isMatch) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const token = await captain.generateAuthToken();

  res.cookie("token", token);

  res.status(200).json({ captain, token });
};

const getCaptainProfile = async (req, res, next) => {
   req.captain = req.captain;
  res.status(200).json({ captain: req.captain });
};


const logoutCaptain = async (req, res, next) => {
  res.clearCookie("token");
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  await blacklistTokenModel.create({ token });
  res.status(200).json({ message: "Logout successful" });
};


module.exports = { registerCaptain , loginCaptain , getCaptainProfile , logoutCaptain };
