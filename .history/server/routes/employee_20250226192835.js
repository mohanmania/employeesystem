const authMiddileware = require("../middileware/authMiddileware");
const express = require("express");
const {addEmployee,upload,getEmployees} = require("../controllers/employeeController")
const router = express.Router()

router.post("/add",upload.single('image'),addEmployee)
router.get("/",authMiddileware,getEmployees)

module.exports = router 
