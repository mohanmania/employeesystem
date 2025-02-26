import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export const columns = [
    {
        name: "S No",
        selector: (row) => row.sno,
        sortable: true,
    }, {
        name: "Image",
        selector: (row) => row.profileImage,
        sortable: true,
    },
    {
        name: "Department",
        selector: (row) => row.dep_name,
        sortable: true,
    },
    {
        name: "DOB",
        selector: (row) => row.dob,
        sortable: true,
    },
    {
        name: "Action",
        cell: (row) => <DepartmentButtons id={row._id} />, // ✅ Correctly passing `id`
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
    },
];


export const FetchDepartments = async () => {
    let department = [];

    const token = localStorage.getItem("token");
    if (!token) {
        message.warn("No user found, please log in");
        return []; 
    }
    console.log("Token:", token);

    try {
        const response = await axios.get("http://localhost:5000/api/department", {
            headers: { "Authorization": `Bearer ${token}` }
        });

        console.log("API Response:", response.data); // Debugging log

        if (response.data.success) {
            department = response.data.department || [];
        }
    } catch (error) {
        console.error("API Error:", error);
        if (error.response?.data?.error) {
            alert(error.response.data.error);
        }
    }
    return department;
};

export const EmployeeButtons = ({ id, onDepartmentDelete }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
  
    if (!token) {
      alert("No token found, please log in");
      return null;
    }
  
  
    const handleDelete = async () => {
      if (!id) {
        alert("Error: Department ID is missing!");
        return;
      }
  
      const confirmDelete = window.confirm("Do you want to delete this department?");
      if (!confirmDelete) return;
  
      try {
        const response = await axios.delete(
          `http://localhost:5000/api/department/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
  
       
      } catch (error) {
        console.error("Error deleting department:", error.response?.data || error.message);
        message.warn(error.response?.data?.error || "An error occurred while deleting.");
      }
    };
  
    return (
      <div className="flex space-x-3">
        <button
          className="px-3 py-1 bg-green-600 text-white"
          onClick={()=> navigate(`/admin-dashboard/department/${Id}`)}
        >
        View
        </button>
        <button className="px-3 py-2 bg-yellow-600 text-white" onClick={handleDelete}>
          Edit
        </button>
        <button className="px-3 py-2 bg-red-600 text-white" onClick={handleDelete}>
          Salary
        </button>
        <button className="px-3 py-2 bg-blue-600 text-white" onClick={handleDelete}>
          leave
        </button>
      </div>
    );
  };
  