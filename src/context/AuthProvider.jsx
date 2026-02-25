import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Load user from localStorage if exists
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    if (saved) {
      return JSON.parse(saved);
    }
    return null;
  });

  const [loading, setLoading] = useState(false);

  // Login function
  const login = (userData) => {
    console.log("Logging in user:", userData);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  // Logout function
  const logout = () => {
    console.log("Logging out user");
    localStorage.removeItem("user");
    setUser(null);
  };

  // Watch user changes
  useEffect(() => {
    console.log("AuthContext user state changed:", user);
  }, [user]);

 const authData = {user, login, logout, loading, setLoading};
  return (
    <AuthContext value={{ authData}}>
      {children}
    </AuthContext>
  );
};