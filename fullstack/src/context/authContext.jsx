import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserContext = createContext();

function AuthContext({ children }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null); 
  const [loading,setLoading] = useState(false)

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await axios.get(
            "http://localhost:5000/api/auth/verify",
            {
              headers: {
                Authorization: `Bearer ${token}`, 
              },
            }
          );
          console.log(response)
          if (response.data.success) {
            setUser(response.data.user);
          }
        } else {
         setUser(null)
         setLoading(false)
        }
      } catch (error) {
        console.log(error)
        if (error.response && !error.response.data.success) {
        
        }
      }
      finally{
        setLoading(false)
      }
    };

    verifyUser();
  }, []); 

  const login = (user) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
}

export const useAuth = () => useContext(UserContext);

export default AuthContext;
