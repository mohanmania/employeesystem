const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, error: "Email and password are required." });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: "Wrong password." });
    }

    const token = jwt.sign(
      { _id: user._id, role: user.role },
      "jwtSecretKeyAAA3333@@@#####888899999jjjjdd",
      { expiresIn: "10d" }
    );

    return res.status(200).json({
      success: true,
      token,
      user: { _id: user._id, name: user.name, role: user.role },
    });

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
};
const verify = (req,res) =>{
  return res.status(200).json({success:true,user:req.user})
}

 


 const register=async (req, res) => {
 
  try {
 const {name,email,password,role}=req.body

  if(!name || !email || !password || !role){
  res.status(400).json({message:"All fields ar Required"})
      }

    const existingUsername = await User.findOne({ email });
    if (existingUsername) {
      return res.status(400).json({ message: "email already exists" });
    }

    const validRoles = ["admin","employee"];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ message: "Invalid role selected" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();
    return res.status(200).json({ message: "Signup successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error qwtd" });
  }
};





module.exports = {login,verify,register};
