import { Form, Layout, Button as AntBtn, Flex, Typography } from "antd";
import { Content } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import { InputStyled } from "../../components/InputStyles/input.styles";
import { useData } from "../../context/DataContext";
import BudgetChart from "../../components/ReactChart/ReactChart";
import API from "../../api";
import Chart from "./Chart";

const expenses = [
  { date: "2025-03-01", amount: 50 },
  { date: "2025-03-02", amount: 30 },
  { date: "2025-03-05", amount: 100 },
];

const monthlyBudget = 1000;

function Analytics() {
  const [data, setData] = useState(null);
  const [budgetLimit, setBudgetLimit] = useState(0);
  const [totalSpent, setTotalSpent] = useState(0);
  const [remainingBudget, setRemainingBudget] = useState(0);

  useEffect(() => {
    const fetchData = async function () {
      const response = await API.get(`/user_budget`);

      if (response.status === 200) {
        //setting all data
        setData(response?.data);

        //setting budget limit
        const userBudgetLimit = response.data.budgetLimit || 0;
        setBudgetLimit(userBudgetLimit);

        //setting budget entries
        const budgetEntries = response.data.budgets || [];

        //setting total spent budget
        const totalPriceSpent = budgetEntries.reduce(
          (sum, budget) => sum + (budget.price || 0),
          0
        );
        setTotalSpent(totalPriceSpent);

        //calculating remaining budget
        const remaining = userBudgetLimit - totalPriceSpent;
        setRemainingBudget(remaining);
      } else {
        console.log("Error:", result.error);
      }
    };

    fetchData();
  }, []);

  // const { data, loading } = useData();
  // const [expense, setExpense] = useState("");
  // const [price, setPrice] = useState("");
  // const [expenseDate, setExpenseDate] = useState("");

  return (
    <Layout>
      <Content style={{ justifyItems: "center", marginTop: "80px" }}>
        <Flex>
          <Typography.Text>Budget Limit:</Typography.Text>
          <Typography.Text>{budgetLimit}</Typography.Text>
        </Flex>
        <Flex>
          <Typography.Text>Budget Spent:</Typography.Text>
          <Typography.Text>{totalSpent}</Typography.Text>
        </Flex>
        <Flex>
          <Typography.Text>Remaining Budget:</Typography.Text>
          <Typography.Text>{remainingBudget}</Typography.Text>
        </Flex>
        {/* <BudgetChart expenses={totalSpent} monthlyBudget={budgetLimit} />; */}
        <Chart budgetLimit={budgetLimit} totalSpent={totalSpent} />
      </Content>
    </Layout>
  );
}

export default Analytics;
