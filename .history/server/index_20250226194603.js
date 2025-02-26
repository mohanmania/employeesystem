const express = require("express");
const cors = require("cors");
const authRouter = require("./routes/auth")
const departmentRouter = require("./routes/department")
const employeeRouter = require("./routes/employee")
const connectTODatabase = require("./db/db")

connectTODatabase()

const app = express();
app.use(cors(
  
));
app.use(express.json());
app.use('/api/auth',authRouter)
app.use('/api/department',departmentRouter)
app.use("/api/employee",employeeRouter)



const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });
module.export 
