import { createContext, useContext, useEffect, useMemo, useState } from "react";
const DataContext = createContext();
import API from "../api";
import { Grid } from "antd";

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState(null);

  const { useBreakpoint } = Grid;

  const mobileView = useBreakpoint();

  const setUserFromToken = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const res = await API.get("/verify", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.status === 200) {
          setUser(res.data.user); // Assuming res.data.user contains user info
        }
      } catch (err) {
        console.error("Token invalid or expired", err);
        localStorage.removeItem("token");
        setUser(null);
      }
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setData({});
  };

  const fetchData = async function () {
    const response = await API.get(`/user_budget`);
    if (response.status === 200) {
      setData(response?.data);
    }
  };

  useEffect(() => {
    setUserFromToken();
    fetchData();
  }, []);

  const contextValue = useMemo(
    () => ({
      user,
      setUser,
      setUserFromToken,
      data,
      fetchData,
      handleLogout,
      loading,
      collapsed,
      setCollapsed,
      mobileView,
    }),
    [user, data, loading, handleLogout, setCollapsed, mobileView]
  );

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
