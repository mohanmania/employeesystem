const mongoose = require("mongoose");
 const connectTODatabase = async ()=>{
    try {
        await mongoose.connect("mongodb://localhost:27017/ems",{
            serverSelectionTimeoutMS: 20000}
        ).then(()=>console.log("db connected"))
    } catch (error) {
        console.log(error)
    }
 }
module.exports = connectTODatabase;