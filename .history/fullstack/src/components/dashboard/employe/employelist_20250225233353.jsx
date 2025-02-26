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
                    "Authorization": `Bearer ${token}`
                }
            });

            console.log("API Response:", response.data); 
            
            if (response.data.success) {
                let sno = 1;
                console.log("Department Data Before Mapping:", response.data.employees);

                const data = response.data.employees.map((dept) => {
                    console.log("Processing Department:", dept._id); // Debugging step
                    return {
                        _id: dept._id,  
                        sno: sno++,
                        dep_name: emp.department.dep_name,
                        name:emp.userId.name,
                        dob:new Date(emp.dob).toDateString(),
                        profileImage:emp.userId.profileImage,
                        action: (<EmployeeButtons  Id={emp._Id}/>) 
                    };
                });

                setEmployees(data);
            }
            consoe
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
