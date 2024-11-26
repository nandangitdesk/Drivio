const express = require("express");
const router = express.Router();
const {register, login, getUserprofile} = require("../controllers/userControllers");
const {body} = require("express-validator");
const { userAuth } = require("../middlewares/authMiddleware");



router.post("/register",[
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("password").isLength({min:8}).withMessage("Password must be at least 8 characters long"),
    body("fullname.firstname").isLength({min:3}).withMessage("First name must be at least 3 characters long"),   
],register);

router.post("/login",[
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("password").isLength({min:8}).withMessage("Password must be at least 8 characters long"),
],login);

router.get("/profile", userAuth , getUserprofile)


module.exports = router;