import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const BudgetChart = ({ expenses, monthlyBudget }) => {
  // Aggregate expenses by day
  const dailyExpenses = expenses.reduce((acc, expense) => {
    const date = new Date(expense.date).getDate();
    acc[date] = (acc[date] || 0) + expense.amount;
    return acc;
  }, {});

  // Convert to chart-friendly format
  const data = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    spent: dailyExpenses[i + 1] || 0,
    remaining: Math.max(0, monthlyBudget - (dailyExpenses[i + 1] || 0)),
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="spent" fill="#ff6347" name="Spent" />
        <Bar dataKey="remaining" fill="#32cd32" name="Remaining Budget" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BudgetChart;
