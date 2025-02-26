import React,{useEffect,useState} from "react";
import { FetchDepartments } from "../utils/employeeHelper";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Department from "../../../server/models/Department";


const Add = ()=>{
    const [employee,setEmployee] = useState({
        name:"",
        maritalStatus:"",
        designation:"",
        salary:0,
        department:"",
    })
    const [departments,setDepartments] = useState(null);
    const navigate = useNavigate();
    const {id} = useParams()

    return(<>
    {departments && employee ?(
        <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-6">Add Salary</h2>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input type="text"
                        name="name"
                        value={employee.name}></input>

                    </div>
                </div>
                <div>
            <label className="block text-sm font-medium text-gray-700">
              Department
            </label>
            <select
              name="department"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Department</option>
              {departments.length > 0 ? (
                departments.map((dep) => (
                  <option key={dep._id} value={dep._id}>
                    {dep.dep_name}
                  </option>
                ))
              ) : (
                <option disabled>No departments available</option>
              )}
            </select>
          </div>

          
          <div>
            <label className="block text-sm font-medium text-gray-700">Gender</label>
            <select
              name="gender"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Marital Status</label>
            <select
              name="maritalStatus"
              onChange={handleChange}
              value={employee.maritalStatus}
              placeholder="Marital Status"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Status</option>
              <option value="male">Singile</option>
              <option value="female">Female</option>
              <option value="other">Married</option>
            </select>
          </div>
            </form>
        </div>
    ):"i"}



    </>)
}