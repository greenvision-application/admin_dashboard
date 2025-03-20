// src/components/ProtectedRoute.tsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../../api";

const ProtectedRoute: React.FC = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;