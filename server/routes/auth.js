const express = require("express");
const authMiddileware = require("../middileware/authMiddileware")
const {login,verify,register} = require("../controllers/authController")
const router = express.Router()
router.post("/login",login)
router.get("/verify",authMiddileware, verify)
router.post('/register',register)
module.exports= router