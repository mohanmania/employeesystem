// import { useNavigate } from "react-router-dom";

// export const columns = [
//     {
//         name: "S No",
//         selector: (row) => row.sno,
//         sortable: true,
//     },
//     {
//         name: "Department Name",
//         selector: (row) => row.dep_name,
//         sortable: true,
//     },
//     {
//         name: "Action",
//         cell: (row) => <DepartmentButtons row={row} />, // Changed from `selector` to `cell`
//         ignoreRowClick: true,
//         allowOverflow: true,
//         button: true,
//     },
// ];

// export const DepartmentButtons = ({id}) => {

//     const navigate = useNavigate()
//     console.log("Navigating with ID:", id); 

//     return (
//         <div className="flex space-x-3">
//             <button className="px-3 py-1 bg-teal-600 text-white"  onClick={()=>navigate(`/admin-dashboard/department/${id}`)}>
//                 Edit
//             </button>
//             <button className="px-3 py-1 bg-red-600 text-white rounded">
//                 Delete
//             </button>
//         </div>
//     );
// };



import { useNavigate } from "react-router-dom";
import axios from "axios";
import {message} from "antd";
export const columns = [
    {
        name: "S No",
        selector: (row) => row.sno,
        sortable: true,
    },
    {
        name: "Department Name",
        selector: (row) => row.dep_name,
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


export const DepartmentButtons = ({ id, onDepartmentDelete }) => {
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
  
        if (response.data.success) {
          message.success("Department deleted successfully!");
          onDepartmentDelete(id); //
          if (onDepartmentDelete) {
            // onDepartmentDelete(id); // ✅ Call function to update state
          } else {
            console.warn("onDepartmentDelete function is not provided.");
          }
        } else {
          alert(response.data.error || "Failed to delete department.");
        }
      } catch (error) {
        console.error("Error deleting department:", error.response?.data || error.message);
        message.warn(error.response?.data?.error || "An error occurred while deleting.");
      }
    };
  
    return (
      <div className="flex space-x-3">
        <button
          className="px-3 py-1 bg-teal-600 text-white"
          onClick={() => navigate(`/admin-dashboard/department/${id}`)}
        >
          Edit
        </button>
        <button className="px-3 py-2 bg-red-600 text-white" onClick={handleDelete}>
          Delete
        </button>
      </div>
    );
  };
  