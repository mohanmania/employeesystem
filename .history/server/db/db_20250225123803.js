const mongoose = require("mongoose");
 const connectTODatabase = async ()=>{
    try {
        await mongoose.connect("mongodb+srv://mohanmaniam934:Ls24FSX9Ewj11VVA@ems.pqcci.mongodb.net/?retryWrites=true&w=majority&appName=EMS",{
            serverSelectionTimeoutMS: 20000,
            
        }
        ).then(()=>console.log("db connected"))
    } catch (error) {
        console.log(error)
    }
 }
module.exports = connectTODatabase;