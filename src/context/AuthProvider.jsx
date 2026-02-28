import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState (()  => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });
 
  const [loading, setLoading] = useState(false);

  const login = (userData) => {
    setLoading(true)
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    setLoading(false)
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setLoading(false)
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
};