




import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export default function AddDepartment() {
    const [department, setDepartment] = useState({
        dep_name: '',
        description: '',
    });

    const HandleChange = (e) => {
        const { name, value } = e.target;
        setDepartment({ ...department, [name]: value });
    };

    const navigate = useNavigate();

    const HandleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        if (!token) {
            alert("No token found, please log in");
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/api/department/add", department, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            if (response.data.success) {
                navigate("/admin-dashboard/employee");
            }
        } catch (error) {
            console.error("API Error:", error);
            if (error.response) {
                alert(`Error: ${error.response.data.error || "Something went wrong"}`);
            } else {
                alert("Network error. Please try again.");
            }
        }
    };

    return (
        <div className='max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96'>
            <h3 className='text-2xl font-bold mb-6'>Add department</h3>
            <form onSubmit={HandleSubmit}>
                <div>
                    <label htmlFor='dep_name' className='text-sm font-medium text-gray-700'>Department Name</label>
                    <input
                        type='text'
                        name="dep_name"
                        onChange={HandleChange}
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
                        placeholder='Description'
                        className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                        rows="4"
                    />
                </div>
                <button type='submit' className='w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded'>
                    Add Department
                </button>
            </form>
        </div>
    );
}

