const User = require("./models/User");
const bcrypt = require("bcrypt")
const  connectTODatabase  = require("./db/db")

const userRegister = async ()=>{
    connectTODatabase()
    try{
        const hashPassword = await bcrypt.hash("admin",10)
        const newUser = new User({
            name:"Admin",
            email:"admiin@gmail.com",
            password:hashPassword,
            role:"admin"
        })
        await newUser.save()
    } catch(error){
        console.log(error)
    }
}
userRegister();