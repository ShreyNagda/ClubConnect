import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useQuery } from "react-query";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  async function fetchUser() {
    if (!document.cookie.includes("token")) {
      return Error("Token not found");
    }
    const token = document.cookie.split("=")[1];
    const res = await axios.get(`/users/${token}`);
    setUser(res.data);
  }

  useEffect(() => {
    console.log("Context created");
    fetchUser();
  }, []);

  useEffect(() => {
    console.log("User updated");
    if (!document.cookie.includes("token")) {
      setUser(null);
    } else {
      fetchUser();
    }
  }, [document.cookie]);

  return (
    <AuthContext.Provider value={{ user, setUser, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};
export { AuthContext, AuthProvider };
