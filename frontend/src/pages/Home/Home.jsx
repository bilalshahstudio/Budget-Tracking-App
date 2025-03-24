import {
  Button as AntBtn,
  Col,
  DatePicker,
  Flex,
  Form,
  Modal,
  Row,
  Space,
  Spin,
  Table,
  Typography,
} from "antd";
import React, { useState } from "react";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { InputStyled } from "../../components/InputStyles/input.styles";
import { useData } from "../../context/DataContext";
import Button from "../../components/ButtonStyles/Button";
import AddModal from "./AddModal";

function Home() {
  const { data, loading } = useData();
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  // const [confirmLoading, setConfirmLoading] = useState(false);

  if (loading) return <Spin spinning={loading} />;
  const showModal = () => {
    setOpen(true);
    setSelectedItem(null);
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
      title: <Typography.Text strong>Expense Type</Typography.Text>,
      dataIndex: "expense",
      key: "expense",
      // align: "center",
    },
    {
      title: <Typography.Text strong>Price</Typography.Text>,
      dataIndex: "price",
      key: "price",
      align: "center",
    },
    {
      title: <Typography.Text strong>Date</Typography.Text>,
      dataIndex: "expenseDate",
      key: "expenseDate",
      filters: [{ date: "", value: "expenseDate" }],
      align: "center",
    },
    {
      title: <Typography.Text strong>Action</Typography.Text>,
      dataIndex: "",
      key: "x",
      align: "center",
      render: (_, record) => (
        <>
          <AntBtn
            onClick={() => {
              setOpen(true);
              setSelectedItem(record);
            }}
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
      // justify="center"
      vertical
      style={
        {
          // marginInline: "10%",
          // marginTop: "14px",
        }
      }
    >
      <Flex
        justify="space-between"
        className="header-items-container"
        // onSubmit={handleSubmit}
        wrap
      >
        <Space wrap>
          <DatePicker style={{ padding: "13px" }} />{" "}
          <Button onClick={() => console.log("clicked filter record button")}>
            Filter Records
          </Button>
        </Space>
        <Button
          style={{
            // padding: "24px",
            color: "#fff",
            backgroundColor: "#000",
          }}
          onClick={showModal}
        >
          Add Budget
        </Button>
        <AddModal data={selectedItem} open={open} setOpen={setOpen} />
        {/* <Modal
          title="Add Budget"
          open={open}
          centered
          // onOk={handleOk}
          // confirmLoading={confirmLoading}
          onCancel={handleCancel}
          footer={null}
        >
          <Form
            onFinish={handleSubmit}
            // labelCol={{ xs: { span: 24 }, sm: { span: 8 } }}
            // wrapperCol={{ xs: { span: 24 }, sm: { span: 16 } }}
            layout="vertical"
            style={{
              // maxWidth: 600,
              // width: "600px",
              justifyItems: "center",
            }}
          >
            {/* <Row gutter={[16, 16]}>
              <Col xs={24} sm={12} md={8} lg={6}>
            <Form.Item
              style={{ width: "100%" }}
              name="expense"
              // label="Expense"
            >
              <InputStyled
                placeholder="Expense Type"
                value={data?.expense}
                onChange={(e) => setExpense(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              style={{ width: "100%" }}
              name="price"
              //  label="Price"
            >
              <InputStyled
                placeholder="Price"
                value={data?.price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Item>
            {/* <Form.Item label="Date">
              <DatePickerStyled
                value={expenseDate}
                onChange={(e) => setExpenseDate(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              //  label="Date"
              style={{ width: "100%" }}
            >
              {/* <InputStyled
                placeholder="Date"
                value={data?.expenseDate}
                onChange={(e) => setExpenseDate(e.target.value)}
              />
              <DatePicker
                defaultValue={new Date(data?.expenseDate)}
                // onChange={(e) => setExpenseDate(e.target.value)}
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
            {/* </Col>
            </Row>
          </Form>
        </Modal> */}
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
