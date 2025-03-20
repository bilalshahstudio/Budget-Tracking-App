import { Form, Layout, Button as AntBtn, Flex, Typography } from "antd";
import { Content } from "antd/es/layout/layout";
import React, { useState } from "react";
import { InputStyled } from "../../components/InputStyles/input.styles";
import { useData } from "../../context/DataContext";

function Analytics() {
  const { data, loading } = useData();
  const [expense, setExpense] = useState("");
  const [price, setPrice] = useState("");
  const [expenseDate, setExpenseDate] = useState("");
  return (
    <Layout>
      <Content style={{ justifyItems: "center", marginTop: "80px" }}>
        <Form
          labelCol={{
            span: 25,
          }}
          wrapperCol={{
            span: 16,
          }}
          layout="vertical"
          style={{
            // maxWidth: 600,
            justifyItems: "center",
            backgroundColor: "#fff",
          }}
        >
          <Form.Item>
            <Typography.Text strong>Add Budget</Typography.Text>
          </Form.Item>
          <Form.Item name="expense" label="Expense">
            <InputStyled
              value={expense}
              onChange={(e) => setExpense(e.target.value)}
            />
          </Form.Item>
          <Form.Item name="price" label="Price">
            <InputStyled
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Item>
          {/* <Form.Item label="Date">
              <DatePickerStyled
                value={expenseDate}
                onChange={(e) => setExpenseDate(e.target.value)}
              />
            </Form.Item> */}
          <Form.Item label="Date">
            <InputStyled
              value={expenseDate}
              onChange={(e) => setExpenseDate(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <AntBtn
              style={{
                backgroundColor: "#000",
                color: "#fff",
                borderRadius: 0,
              }}
              type="primary"
            >
              Submit
            </AntBtn>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  );
}

export default Analytics;
