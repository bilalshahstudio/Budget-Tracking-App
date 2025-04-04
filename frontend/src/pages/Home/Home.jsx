import {
  Button as AntBtn,
  DatePicker,
  Flex,
  Space,
  Table,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { useData } from "../../context/DataContext";
import Button from "../../components/ButtonStyles/Button";
import AddModal from "./AddModal";
import API from "../../api";

function Home() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    const fetchData = async function () {
      const response = await API.get(`/user_budget`);

      if (response.status === 200) {
        setData(response?.data?.budgets);
      }
    };

    fetchData();
  }, []);

  // const [confirmLoading, setConfirmLoading] = useState(false);

  // if (loading) return <Spin spinning={loading} />;
  const showModal = (item, isEdit) => {
    console.log(item);
    setOpen(true);
    setSelectedItem(item);
    setIsEdit(isEdit);
  };

  const handleDelete = async (record) => {
    const response = await API.post("/user_budget", record);

    const result = response.data;

    if (!response.ok) {
      console.log(result.error);
    } else {
      console.log(result);
    }
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
      title: <Typography.Text strong>Name</Typography.Text>,
      dataIndex: "budgetName",
      key: "budgetName",
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
      // filters: [{ date: "", value: "expenseDate" }],
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
            onClick={() => showModal(record, true)}
            type="link"
            icon={<EditFilled />}
          >
            Edit
          </AntBtn>
          <AntBtn
            onClick={() => handleDelete(record)}
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
          onClick={() => showModal(null, false)}
        >
          Add Budget
        </Button>
        <AddModal
          data={selectedItem}
          open={open}
          isEdit={isEdit}
          setOpen={setOpen}
        />
      </Flex>
      <Table
        style={{
          marginTop: "8px",
          // border: "1px solid",
          // borderColor: "#cac2c2",
        }}
        dataSource={data.length ? data : null}
        columns={columns}
        size="small"
      />
    </Flex>
  );
}

export default Home;
