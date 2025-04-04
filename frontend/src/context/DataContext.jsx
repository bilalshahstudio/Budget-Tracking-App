import { createContext, useContext, useEffect, useMemo, useState } from "react";
import API from "../api";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log(data);

  useEffect(() => {
    // const fetchData = async function () {
    //   const response = await API.get(`/user_budget`);
    //   if (response.status === 200) {
    //     setData(response?.data?.budgets);
    //   }
    // };
    // fetchData();
  }, []);

  const contextValue = useMemo(() => ({ data, loading }), [data, loading]);

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
