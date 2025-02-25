const mongoose = require("mongoose")
const departmentSchema = new mongoose.Schema({
    dep_name:{type:String,required:true},
    description:{type:String,default:Date.now},
    createdAt:{type:Date,default:Date.now},
    updatedAt:{type:Date,default:Date.now}
})
const Department = mongoose.model("Department",departmentSchema)
module.exports = Department