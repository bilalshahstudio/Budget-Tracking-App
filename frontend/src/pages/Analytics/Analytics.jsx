import {
  Form,
  Layout,
  Button as AntBtn,
  Flex,
  Typography,
  Tabs,
  Select,
} from "antd";
import { Content } from "antd/es/layout/layout";
import React, { useEffect, useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { format, parseISO, subMonths, isAfter } from "date-fns";
import { InputStyled } from "../../components/InputStyles/input.styles";
import { useData } from "../../context/DataContext";
import API from "../../api";
import Title from "antd/es/typography/Title";

function Analytics() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async function () {
      const response = await API.get(`/user_budget`);

      if (response.status === 200) {
        //setting all data
        setData(response?.data.budgets || []);
      } else {
        console.log("Error:", result.error);
      }
    };

    fetchData();
  }, [data]);

  return (
    <Layout>
      <Content style={{ justifyItems: "center", marginTop: "80px" }}></Content>
    </Layout>
  );
}

export default Analytics;
