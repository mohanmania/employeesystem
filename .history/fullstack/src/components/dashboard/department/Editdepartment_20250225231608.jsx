import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
function Editdepartment() {
  const navigate = useNavigate()
  const {id} = useParams()
  const [department,setDepartment] = useState([])
  const [depLoading ,setDepLoading]  = useState(false)
  const token = localStorage.getItem('token');
        if (!token) {
            alert("No token found, please log in");
            return;
        }
  useEffect(() => {
    const fetchDepartments = async () => {
      setDepLoading(true)
        try {
            const response = await axios.get(`https://employeesystem-zkpz.vercel.app/api/department/${id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            console.log("API Response:", response.data); 
            
            if (response.data.success) {
              setDepartment(response.data.department)
               
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
const HandleChange =  (e) => {
  const { name, value } = e.target;
  setDepartment({ ...department, [name]: value });
};
const handleSubmit = async (e)=>{
  e.preventDefault()
  try {
    const response = await axios.put(`http://localhost:5000/api/department/${id}`, department, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });

    if (response.data.success) {
        navigate("/admin-dashboard/departments");
    }
} catch (error) {
    console.error("API Error:", error);
    if (error.response) {
        alert(`Error: ${error.response.data.error || "Something went wrong"}`);
    } else {
        alert("Network error. Please try again.");
    }
}
}
  return (
    <>{depLoading ? <div>Loading....</div>:
    <div className='max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96'>
            <h3 className='text-2xl font-bold mb-6'>Edit department</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='dep_name' className='text-sm font-medium text-gray-700'>Department Name</label>
                    <input
                        type='text'
                        name="dep_name"
                        onChange={HandleChange}
                        value={department.dep_name}
                        placeholder='Enter dep Name'
                        required
                        className='mt-1 w-full p-2 border border-gray-300 rounded-md'
                    />
                </div>
                <div className='mt-3'>
                    <label htmlFor='description' className='block text-sm font-medium text-gray-700'>Description</label>
                    <textarea
                        name="description"
                        onChange={HandleChange}
                        value={department.description}
                        placeholder='Description'
                        className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                        rows="4"
                    />
                </div>
                <button type='submit' className='w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded'>
                    Edit Department
                </button>
            </form>
        </div>
}</>
  )
}

export default Editdepartment
