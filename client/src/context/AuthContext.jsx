import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const authenticate = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/users/profile`, {withCredentials: true});

        if(res.ok){
          setUser(res.data);
        } else {
          throw new Error("Not authenticated");
        }      
      } catch (error) {
        console.log("Not authenticated", error);
        setUser(null);
      } 
    }

    authenticate();
  }, []);

  return (
    <AuthContext.Provider value={{user, setUser}}>
      {children}
    </AuthContext.Provider>
  );
}
