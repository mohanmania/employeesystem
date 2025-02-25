const mongoose = require("mongoose");


const employeeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    employeeId: { type: String, required: true, unique: true },
    dob: { type: String },
    gender: { type: String },
    maritalStatus: { type: String },
    designation: { type: String },
    department: { type: mongoose.Schema.Types.ObjectId, ref: "Department", required: true },
    salary: { type: Number, required: true },
    createdAt: { type: Number, required: true ,timestamps: true ,default:Date.now },
    updatedAt: { type: Number, default: Date.now }
     
});

const Employee = mongoose.model("Employee", employeeSchema);
module.exports = Employee;
