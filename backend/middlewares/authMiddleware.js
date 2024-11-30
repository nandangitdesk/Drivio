const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const blacklistTokenModel = require("../models/blacklistTokenModel");
const captainModel = require("../models/captainModel");

const userAuth = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const blacklistToken = await blacklistTokenModel.findOne({ token });

  if (blacklistToken) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decoded._id);

    if (!user) {
      console.error("User not found");
      return res.status(401).json({ error: "Unauthorized" });
    }

    req.user = user;
    return next();
  } catch (error) {
    console.error("Auth Error:", error.message);
    return res.status(401).json({ error: "Unauthorized" });
  }
};

const captainAuth = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const captain = await captainModel.findById(decoded._id);

    if (!captain) {
      console.error("Captain not found");
      return res.status(401).json({ error: "Unauthorized" });
    }

    req.captain = captain;
    return next();
  } catch (error) {
    console.error("Auth Error:", error.message);
    return res.status(401).json({ error: "Unauthorized" });
  }
};



module.exports = { userAuth, captainAuth };
