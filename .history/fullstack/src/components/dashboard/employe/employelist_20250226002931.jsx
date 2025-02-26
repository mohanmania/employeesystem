import React,{useEffect,useState} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import DataTable from "react-data-table-component";

import {columns, EmployeeButtons} from "../../../utils/employeeHelper"
function Employelist() {
  const [employees, setEmployees] = useState([]);
  const [empLoading, setEmpLoading] = useState(true);
  const [filterdepartment,setFilterdepartment] = useState([])
  const token = localStorage.getItem("token");
    if (!token) {
        alert("No token found, please log in");
        return null;
    }
  useEffect(() => {
    const fetchEmployees = async () => {
      setEmpLoading(true)
        try {
            const response = await axios.get("https://employeesystem-zkpz.vercel.app/api/employee", {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            console.log("API Response:", response.data); 
            
            if (response.data.success) {
                let sno = 1;
                console.log("Department Data Before Mapping:", response.data.employees);

                const data = response.data.employees.map((dept, index) => {
                  console.log("Processing Employee:", dept); // Debugging step
              
                  return {
                      _id: dept._id,
                      sno: index + 1,
                      dep_name: dept.department?.dep_name || "N/A", // Ensure `department` exists
                      name: dept.userId?.name || "N/A", // Ensure `userId` exists
                      dob: dept.dob ? new Date(dept.dob).toDateString() : "N/A",
                      profileImage: dept.userId?.profileImage || "N/A",
                      action: (<EmployeeButtons Id={dept._id} />) 
                  };
              });
                console.log(data)

                setEmployees(data);
            }
            
        } catch (error) {
            console.error("API Error:", error); // Debugging step
            if (error.response?.data?.error) {
                alert(error.response.data.error);
            }
        } finally {
            setEmpLoading(false);
        }
    };

    fetchEmployees();
}, []);

  return (
    <div>
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Employess</h3>
      </div>
      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="Search department"
          className="px-4 py-0.5 border"
        //   onChange={filterdepartments}
        />
        <Link
          to="/admin-dashboard/add-employee"
          className="px-4 py-1 bg-teal-600 rounded text-white"
        >
          Add New Employee
        </Link>
      </div>
      <div>
        <DataTable columns={columns} data={employees}/>
      </div>
    </div>
  );
}

export default Employelist;
