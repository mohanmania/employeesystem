const mongoose = require("mongoose");
const dotenv = require("dotenv")
dotenv.config()
 const connectTODatabase = async ()=>{
    try {
        await mongoose.connect(MONOGODB_URL,{
            serverSelectionTimeoutMS: 20000,
            
        }
        ).then(()=>console.log("db connected"))
    } catch (error) {
        console.log(error)
    }
 }
module.exports = connectTODatabase;