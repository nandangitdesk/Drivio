const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userAuth = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = req.cookies.token || (authHeader && authHeader.split(" ")[1]);
  
    if (!token) {
      console.error("No token provided");
      return res.status(401).json({ error: "Unauthorized" });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded Token:", decoded);
  
      const user = await userModel.findById(decoded._id);
      if (!user) {
        console.error("User not found");
        return res.status(401).json({ error: "Unauthorized" });
      }
  
      req.user = user;
      next();
    } catch (error) {
      console.error("Auth Error:", error.message);
      return res.status(401).json({ error: "Unauthorized" });
    }
  };
  

module.exports = { userAuth };
