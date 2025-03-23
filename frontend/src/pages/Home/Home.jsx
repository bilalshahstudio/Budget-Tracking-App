import {
  Button as AntBtn,
  DatePicker,
  Flex,
  Form,
  Modal,
  Space,
  Table,
} from "antd";
import React, { useState } from "react";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import Button from "../../components/ButtonStyles/Button";
import { InputStyled } from "../../components/InputStyles/input.styles";
import { useData } from "../../context/DataContext";

function Home() {
  const { data, loading } = useData();
  const [open, setOpen] = useState(false);
  // const [confirmLoading, setConfirmLoading] = useState(false);

  console.log(data);

  if (loading) return <p>loading</p>;
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setOpen(false);
    // setModalText("The modal will be closed after two seconds");
    // setConfirmLoading(true);
    // setTimeout(() => {
    //   setConfirmLoading(false);
    // }, 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const addUserData = { expense, price, expenseDate };

    const response = await fetch("http://localhost:5000/", {
      method: "POST",
      body: JSON.stringify(addUserData),
      headers: {
        "Content-Type": "appication/json",
      },
    });

    const result = await response.json();

    if (!response.ok) {
      console.log(result.error);
    }
    if (response.ok) {
      console.log(result);
    }
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  const columns = [
    {
      title: "Expense Type",
      dataIndex: "expense",
      key: "expense",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Date",
      dataIndex: "expenseDate",
      key: "expenseDate",
      filters: [{ date: "", value: "expenseDate" }],
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: () => (
        <>
          <AntBtn
            onClick={() => console.log("clicked edit button")}
            type="link"
            icon={<EditFilled />}
          >
            Edit
          </AntBtn>
          <AntBtn
            onClick={() => console.log("clicked delete button")}
            type="link"
            icon={<DeleteFilled />}
          >
            Delete
          </AntBtn>
        </>
      ),
    },
  ];
  return (
    <Flex
      justify="center"
      vertical
      style={{
        // marginInline: "10%",
        marginTop: "14px",
      }}
    >
      <Flex
        justify="space-between"
        className="header-items-container"
        onSubmit={handleSubmit}
      >
        <Space>
          <DatePicker style={{ padding: "13px" }} />{" "}
          <Button onClick={() => console.log("clicked filter record button")}>
            Filter Records
          </Button>
        </Space>
        <Button
          style={{
            padding: "24px",
            color: "#fff",
            backgroundColor: "#000",
          }}
          onClick={showModal}
        >
          Add Budget
        </Button>
        <Modal
          title="Add Budget"
          open={open}
          // onOk={handleOk}
          // confirmLoading={confirmLoading}
          onCancel={handleCancel}
          footer={[]}
          style={{ justifyItems: "flex-start" }}
        >
          <Form
            onFinish={handleSubmit}
            labelCol={{
              span: 25,
            }}
            wrapperCol={{
              span: 25,
            }}
            layout="vertical"
            style={{
              // maxWidth: 600,
              // width: "600px",
              justifyItems: "center",
            }}
          >
            <Form.Item style={{ width: "100%" }} name="expense" label="Expense">
              <InputStyled
                value={data?.expense}
                onChange={(e) => setExpense(e.target.value)}
              />
            </Form.Item>
            <Form.Item style={{ width: "100%" }} name="price" label="Price">
              <InputStyled
                value={data?.price}
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
                value={data?.expenseDate}
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
                htmlType="submit"
              >
                Submit
              </AntBtn>
            </Form.Item>
          </Form>
        </Modal>
      </Flex>
      <Table
        style={{
          marginTop: "8px",
          // border: "1px solid",
          // borderColor: "#cac2c2",
        }}
        dataSource={data}
        columns={columns}
        size="small"
      />
    </Flex>
  );
}

export default Home;
