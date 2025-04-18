import { Layout, Flex, Typography, Tabs } from "antd";
import { Content } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
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
import API from "../../api";
import Title from "antd/es/typography/Title";

const tabOptions = [
  { key: "1M", label: "Last Month" },
  { key: "6M", label: "Last 6 Months" },
  { key: "12M", label: "Last 12 Months" },
];

function Analytics() {
  const [data, setData] = useState([]);
  const [budgetLimit, setBudgetLimit] = useState(0);
  const [activeTab, setActiveTab] = useState("1M");

  useEffect(() => {
    const fetchData = async function () {
      const response = await API.get(`/user_budget`);

      if (response.status === 200) {
        //setting all data
        setData(response?.data.budgets || []);
        setBudgetLimit(response.data.budgetLimit || 0);
      } else {
        console.log("Error:", result.error);
      }
    };

    fetchData();
  }, [data]);

  // Filter data by selected range
  const filteredData = data
    .filter((item) => {
      const date = new Date(item.date);
      const today = new Date();
      const filterDate =
        activeTab === "1M"
          ? subMonths(today, 1)
          : activeTab === "6M"
          ? subMonths(today, 6)
          : subMonths(today, 12);
      return isAfter(date, filterDate);
    })
    .map((item) => ({
      ...item,
      date:
        activeTab === "1M"
          ? format(parseISO(item.date), "MM/dd") // Day wise for 1M
          : format(parseISO(item.date), "yy-MM"), // Month wise for 6M/12M
    }));

  // Aggregate data by month
  const aggregatedData = Array.from(
    filteredData
      .reduce((acc, curr) => {
        const key = curr.date;
        const total = (acc.get(key)?.price || 0) + curr.price;
        acc.set(key, { date: key, price: total });
        return acc;
      }, new Map())
      .values()
  );

  return (
    <Layout>
      <Content
        className="chart-container"
        style={{
          padding: "4%",
          backgroundColor: "#fff",
        }}
      >
        <Flex align="center" gap={8} vertical wrap>
          <Typography.Title level={3}>Budget Analytics</Typography.Title>
          <Typography.Text level={3}>
            Budget Limit: {budgetLimit}
          </Typography.Text>
        </Flex>
        <Tabs
          defaultActiveKey="1M"
          onChange={(key) => setActiveTab(key)}
          items={tabOptions.map((tab) => ({
            key: tab.key,
            label: tab.label,
            children: (
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={aggregatedData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="#FBC93F"
                    activeDot={{ r: 8 }}
                    name="Spent"
                  />
                  <Line
                    type="monotone"
                    dataKey={() => budgetLimit} // Replace with real user limit
                    stroke="#ff4d4f"
                    strokeDasharray="5 5"
                    name="Limit"
                  />
                </LineChart>
              </ResponsiveContainer>
            ),
          }))}
        />
      </Content>
    </Layout>
  );
}

export default Analytics;
