import { Button, DatePicker, Flex, Input, Table } from "antd";
import React from "react";
import { ButtonStyled } from "../../components/ButtonStyles/button.styles";
import { DeleteFilled, EditFilled } from "@ant-design/icons";

function Home() {
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
      title: "Name",
      dataIndex: "name",
      key: "name",
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
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: () => (
        <>
          <Button type="link" icon={<EditFilled />}>
            Edit
          </Button>
          <Button type="link" icon={<DeleteFilled />}>
            Delete
          </Button>
        </>
      ),
    },
  ];
  return (
    <Flex
      justify="center"
      vertical
      style={{ paddingInline: "15%", marginTop: "14px" }}
    >
      <Flex className="header-items-container">
        <Flex>
          <DatePicker style={{ padding: "13px" }} />{" "}
          <ButtonStyled>Filter Records</ButtonStyled>
        </Flex>
        <Button
          style={{
            borderRadius: 0,
            padding: "24px",
            color: "#fff",
            backgroundColor: "#000",
          }}
        >
          Add Budget
        </Button>
      </Flex>
      <Table dataSource={dataSource} columns={columns} size="small" />;
    </Flex>
  );
}

export default Home;
