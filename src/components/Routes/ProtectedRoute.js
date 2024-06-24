// ProtectedRoute.js
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useStateValue } from "../../StateProvider";

const ProtectedRoute = () => {
  const [{ isAuthenticated, user }] = useStateValue();

  console.log("ProtectedRoute - user:", user);
  if (!isAuthenticated || !user || !user.role.includes("admin")) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
