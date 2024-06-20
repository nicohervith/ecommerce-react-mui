// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { loginRequest, verifyTokenRequest } from "../api/auth";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const login = async (credentials) => {
    try {
      const res = await loginRequest(credentials);
      setUser(res.data);
      setIsAuthenticated(true);
      Cookies.set("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    Cookies.remove("token");
    localStorage.removeItem("user");
  };

  useEffect(() => {
    const checkLogin = async () => {
      const token = Cookies.get("token");
      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        const res = await verifyTokenRequest(token);
        if (!res.data) {
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }

        setIsAuthenticated(true);
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        setIsAuthenticated(false);
        setLoading(false);
      }
    };

    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
