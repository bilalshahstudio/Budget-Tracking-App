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
import { DatePickerStyled } from "../../components/DatePickerStyles/datePicker.Styles";

function Home() {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

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
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  const dataSource = [
    {
      key: "1",
      name: "Mike",
      price: 32,
      date: "10 Downing Street",
    },
    {
      key: "2",
      name: "John",
      price: 42,
      date: "10 Downing Street",
    },
  ];

  const columns = [
    {
      title: "Expense",
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
      dataIndex: "date",
      key: "date",
      filters: [{ date: "", value: "date" }],
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: () => (
        <>
          <AntBtn type="link" icon={<EditFilled />}>
            Edit
          </AntBtn>
          <AntBtn type="link" icon={<DeleteFilled />}>
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
      style={{ marginInline: "10%", marginTop: "14px" }}
    >
      <Flex justify="space-between" className="header-items-container">
        <Space>
          <DatePicker style={{ padding: "13px", borderRadius: 0 }} />{" "}
          <Button>Filter Records</Button>
        </Space>
        <Button
          style={{
            borderRadius: 0,
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
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
          footer={[]}
          style={{ justifyItems: "flex-start" }}
        >
          <Form
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 14,
            }}
            layout="horizontal"
            style={{
              maxWidth: 600,
              justifyItems: "center",
            }}
          >
            <Form.Item name="name" label="Name">
              <InputStyled />
            </Form.Item>
            <Form.Item name="price" label="Price">
              <InputStyled />
            </Form.Item>
            <Form.Item label="Date">
              <DatePickerStyled />
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
        </Modal>
      </Flex>
      <Table
        style={{ marginTop: "8px" }}
        dataSource={dataSource}
        columns={columns}
        size="small"
      />
      ;
    </Flex>
  );
}

export default Home;
