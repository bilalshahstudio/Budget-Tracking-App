import { Form, Layout, Button as AntBtn, Flex, Typography } from "antd";
import { Content } from "antd/es/layout/layout";
import React, { useState } from "react";
import { InputStyled } from "../../components/InputStyles/input.styles";
import { useData } from "../../context/DataContext";
import BudgetChart from "../../components/ReactChart/ReactChart";

const expenses = [
  { date: "2025-03-01", amount: 50 },
  { date: "2025-03-02", amount: 30 },
  { date: "2025-03-05", amount: 100 },
];

const monthlyBudget = 1000;

function Analytics() {
  // const { data, loading } = useData();
  // const [expense, setExpense] = useState("");
  // const [price, setPrice] = useState("");
  // const [expenseDate, setExpenseDate] = useState("");
  return (
    <Layout>
      <Content style={{ justifyItems: "center", marginTop: "80px" }}>
        <BudgetChart expenses={expenses} monthlyBudget={monthlyBudget} />;
      </Content>
    </Layout>
  );
}

export default Analytics;
