import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, allowedRoles }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  // Redirect if no token or invalid role
  if (!token || !allowedRoles.includes(role)) {
    return <Navigate to="/login" />;
  }

  return element;
};

export default PrivateRoute;
