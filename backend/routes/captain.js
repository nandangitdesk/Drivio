const express = require("express");
const router = express.Router();
const {body} = require("express-validator");
const captainController = require("../controllers/captainControllers");
const { captainAuth } = require("../middlewares/authMiddleware");

router.post("/register",[
    body("fullname.firstname").isLength({min:3}).withMessage("First name must be at least 3 characters long"),
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("password").isLength({min:8}).withMessage("Password must be at least 8 characters long"),
    body("vehicle.color").isLength({min:3}).withMessage("Color must be at least 3 characters long"),
    body("vehicle.plate").isLength({min:3}).withMessage("Plate must be at least 3 characters long"),
    body("vehicle.capacity").isNumeric().withMessage("Capacity must be a number"),
    body("vehicle.vehicleType").isIn(["car","auto","motorcycle"]).withMessage("Vehicle type must be car, auto or motorcycle"),
],captainController.registerCaptain)

router.post("/login",[
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("password").isLength({min:8}).withMessage("Password must be at least 8 characters long"),
] ,captainController.loginCaptain)

router.get("/profile", captainAuth , captainController.getCaptainProfile)

router.get("/logout", captainAuth , captainController.logoutCaptain);




module.exports = router;