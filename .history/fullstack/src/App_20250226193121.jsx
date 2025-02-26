import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import PrivateRoutes from "./utils/PrivateRoutes";
import RoleBaseRoutes from "./utils/RoleBaseRoutes";
import Register from "./pages/Register";
import { DepartmentList } from "./components/dashboard/department/DepartmentList";
import AdminSummary from "./components/dashboard/AdminSummary";
import AddDepartment from "./components/dashboard/department/AddDepartment";
import Editdepartment from "./components/dashboard/department/Editdepartment";
import Employelist from "./components/dashboard/employe/employelist";
import Addemp from "./components/dashboard/employe/Addemp";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/admin-dashboard" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register/>}/>
          <Route path="/employee-dashboard" element={<EmployeeDashboard />} />

          <Route
            path="/admin-dashboard"
            element={
              <PrivateRoutes>
                <RoleBaseRoutes requiredRole={["admin"]}>
                  <AdminDashboard />
                </RoleBaseRoutes>
              </PrivateRoutes>
            }
          >
          <Route index element={<AdminSummary/>}></Route>
         
          <Route path="/admin-dashboard/departments" element={<DepartmentList/>}></Route>
          <Route path="/admin-dashboard/add-new-department" element={<AddDepartment/>}></Route>
           <Route path="/admin-dashboard/department/:id" element={<Editdepartment/>}></Route>
           <Route path="admin-dashboard/employees" element={<Employelist/>}></Route>
         <Route path="/admin-dashboard/employee" element={<Addemp/>}></Route>

          </Route>
          <Route path="/employee-dashboard" element={<EmployeeDashboard/>}></Route>

          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
