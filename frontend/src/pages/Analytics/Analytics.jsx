import { Form, Layout, Button as AntBtn, Flex, Typography, Tabs } from "antd";
import { Content } from "antd/es/layout/layout";
import React, { useEffect, useMemo, useState } from "react";
import { subMonths, format, isAfter } from "date-fns";
import { InputStyled } from "../../components/InputStyles/input.styles";
import { useData } from "../../context/DataContext";
import BudgetChart from "../../components/ReactChart/ReactChart";
import API from "../../api";
import TabPane from "antd/es/tabs/TabPane";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function Analytics() {
  const [data, setData] = useState([]);
  const [range, setRange] = useState(1);

  useEffect(() => {
    const fetchData = async function () {
      const response = await API.get(`/user_budget`);

      if (response.status === 200) {
        //setting all data
        setData(response?.data.budgets);
      } else {
        console.log("Error:", result.error);
      }
    };

    fetchData();
  }, [data, range]);

  const filteredData = useMemo(() => {
    const startDate = subMonths(new Date(), range);
    return data
      .filter((entry) => isAfter(new Date(entry.date), startDate))
      .map((entry) => ({
        ...entry,
        overLimit: entry.expense > entry.limit,
        formattedDate: format(new Date(entry.date), "MMM yyyy"),
      }));
  }, [data, range]);

  return (
    <Layout>
      <Content style={{ justifyItems: "center", marginTop: "80px" }}>
        <Tabs defaultActiveKey="1" onChange={(key) => setRange(Number(key))}>
          <TabPane tab="Last Month" key="1" />
          <TabPane tab="Last 6 Months" key="6" />
          <TabPane tab="Last 12 Months" key="12" />
        </Tabs>

        <LineChart
          width={800}
          height={400}
          data={filteredData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="formattedDate" />
          <YAxis />
          <Tooltip />
          <Legend />

          <Line type="monotone" dataKey="expense" stroke="#8884d8" />
          <Line
            type="monotone"
            dataKey="limit"
            stroke="#82ca9d"
            strokeDasharray="5 5"
          />

          {filteredData.map((entry, index) =>
            entry.overLimit ? (
              <ReferenceLine
                key={index}
                x={entry.formattedDate}
                stroke="red"
                label="Over Limit"
              />
            ) : null
          )}
        </LineChart>
      </Content>
    </Layout>
  );
}

export default Analytics;
