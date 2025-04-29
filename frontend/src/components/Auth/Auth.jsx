import { useState } from "react";
import { Navigate } from "react-router-dom";

const Auth = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default Auth;
