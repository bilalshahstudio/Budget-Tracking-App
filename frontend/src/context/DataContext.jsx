import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log(data);

  useEffect(() => {
    // axios
    //   .get("http://localhost:5000/users")
    //   .then((res) => {
    //     setData(res.data);
    //     setLoading(false);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     setLoading(false);
    //   });
  }, []);

  const contextValue = useMemo(() => ({ data, loading }), [data, loading]);

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
