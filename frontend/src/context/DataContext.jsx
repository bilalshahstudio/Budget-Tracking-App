import { createContext, useContext, useEffect, useMemo, useState } from "react";
const DataContext = createContext();
import API from "../api";
import { Grid } from "antd";

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [collapsed, setCollapsed] = useState(false);

  const { useBreakpoint } = Grid;

  const mobileView = useBreakpoint();

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
    fetchData();
  }, []);

  const contextValue = useMemo(
    () => ({
      data,
      fetchData,
      handleLogout,
      loading,
      collapsed,
      setCollapsed,
      mobileView,
    }),
    [data, loading, handleLogout, setCollapsed, mobileView]
  );

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
