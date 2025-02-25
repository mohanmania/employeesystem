


import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { columns, DepartmentButtons } from "../../../utils/DepartmentHelper";
import axios from "axios";

export const DepartmentList = () => {
    const [department, setDepartment] = useState([]);
    const [depLoading, setDepLoading] = useState(true);
    const [filterdepartment,setFilterdepartment] = useState([])
    const onDepartmentDelete = async (id)=>{
        const data = await department.filter(dep => dep_id !== id)
        setDepartment(data)


    }
    const token = localStorage.getItem("token");
    if (!token) {
        alert("No token found, please log in");
        return null;
    }

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/department", {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                console.log("API Response:", response.data); 
                
                if (response.data.success) {
                    let sno = 1;
                    console.log("Department Data Before Mapping:", response.data.department);

                    const data = response.data.department.map((dept) => {
                        console.log("Processing Department:", dept._id); // Debugging step
                        return {
                            _id: dept._id,  
                            sno: sno++,
                            dep_name: dept.dep_name,
                            action: <DepartmentButtons id={dept._id} onDepartmentDelete={onDepartmentDelete} />
                        };
                    });

                    setDepartment(data);
                    setFilterdepartment(data)
                }
            } catch (error) {
                console.error("API Error:", error); // Debugging step
                if (error.response?.data?.error) {
                    alert(error.response.data.error);
                }
            } finally {
                setDepLoading(false);
            }
        };

        fetchDepartments();
    }, []);
    const filterdepartments = (e)=>{
        const records = department.filter((dep)=>
        dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase()))
        setFilterdepartment(records)
    }

    return (
        <>
            {depLoading ? (
                <div>Loading...</div> 
            ) : (
                <div className="p-5">
                    <div className="text-center">
                        <h3 className="text-2xl font-bold">Manage Departments</h3>
                    </div>
                    <div className="flex justify-between items-center">
                        <input type="text" placeholder="Search department" className="px-4 py-0.5 border"  onChange={filterdepartments} />
                        <Link to="/admin-dashboard/add-new-department" className="px-4 py-1 bg-teal-600 rounded text-white">
                            Add New Department
                        </Link>
                    </div>
                    <div>
                        <DataTable columns={columns} data={filterdepartment} />
                    </div>
                </div>
            )}
        </>
    );
};
