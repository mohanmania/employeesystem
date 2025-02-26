const path = require("path");
const Employee = require("../models/employee");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const Department = require("../models/Department");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });

const addEmployee = async (req, res) => {
    const {
        name,
        email,
        employeeId, 
        dob,
        gender,
        maritalStatus,
        designation,
        department,
        salary,
        password,
        role,
    } = req.body;

  
    if (!email || !password) {
        return res.status(400).json({ 
            success: false, 
            error: "Email and password are required" 
        });
    }

    try {
      
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ 
                success: false, 
                error: "User already registered" 
            });
        }

        let hashPassword;
        try {
            hashPassword = await bcrypt.hash(password, 10);
        } catch (hashError) {
            console.error("Error hashing password:", hashError);
            return res.status(500).json({ 
                success: false, 
                error: "Server error while hashing password" 
            });
        }

        const newUser = new User({
            name,
            email,
            password: hashPassword,
            role,
            profileImage: req.file ? req.file.filename : "", 
        });

        const savedUser = await newUser.save();

        const newDepartment = new Department({
            dep_name:department,
            
        })

        const savedDepartment = await newDepartment.save()

        const newEmployee = new Employee({
            userId: savedUser._id,
            employeeId,
            dob,
            gender,
            maritalStatus,
            designation,
            department:savedDepartment._id,
            salary,
        });
        await newEmployee.save();

        return res.status(201).json({ 
            success: true, 
            message: "Employee created successfully" 
        });

    } catch (error) {
        console.error("Error in addEmployee:", error);
        return res.status(500).json({ 
            success: false, 
            error: "Server error, please try again" 
        });
    }
};
const getEmployees = async (re)=>{
    try{
        const employees = await Employee.find().populate('userId',{password:0}).populate('department')
        return res.status(200).json({success:true,employees})
      }catch(error){
        return res.status(500).json({success:false,error:"get department server error"})
      }
}
module.exports = { addEmployee, upload,getEmployees };
