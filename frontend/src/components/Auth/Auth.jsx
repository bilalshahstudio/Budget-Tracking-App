// import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const Auth = () => {
  const { user } = useData();
  // const [isAuthenticated, setIsAuthenticated] = useState(true);
  //   return isAuthenticated ? children : <Navigate to="/login" />;
  // };

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default Auth;
