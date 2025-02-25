const express = require("express");
const authMiddileware = require("../middileware/authMiddileware");
const {addDepartment,getDepartments,updateDepartment,getDepartment,deleteDepartment} = require("../controllers/departmentController");
const router = express.Router()
 const dotenv=require('dotenv').config()

router.post('/add',authMiddileware,addDepartment)
router.get("/",authMiddileware,getDepartments)
router.get("/:id",authMiddileware,getDepartment)
router.put("/:id",authMiddileware,updateDepartment)
router.delete("/:id",authMiddileware,deleteDepartment)

module.exports = router