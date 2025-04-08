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
import Button from "../../components/ButtonStyles/Button";
import AddModal from "./AddModal";
import API from "../../api";
import { format } from "date-fns";

function Home() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  const fetchData = async function () {
    const response = await API.get(`/user_budget`);

    if (response.status === 200) {
      setData(response?.data?.budgets);
    } else {
      console.log("Error:", result.error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [open]);

  // const [confirmLoading, setConfirmLoading] = useState(false);

  // if (loading) return <Spin spinning={loading} />;
  const showModal = (item, isEdit) => {
    console.log(item);
    setOpen(true);
    setSelectedItem(item);
    setIsEdit(isEdit);
  };

  // const handleDelete = async (record) => {
  //   const response = await API.delete(`/user_budget`, record);

  //   const result = response.data;

  //   if (!response.ok) {
  //     console.log(result.error);
  //   } else {
  //     fetchData();
  //     console.log(result);
  //     alert("Budget deleted successfully!");
  //   }
  // };

  const handleDelete = async (budgetId) => {
    try {
      const response = await API.delete(`/user_budget/${budgetId}`);

      if (response.status === 200) {
        console.log("Budget deleted successfully:", response.data);

        // Update state to remove the deleted item from the list
        setData((prevData) => prevData.filter((item) => item._id !== budgetId));
      } else {
        console.log(response.data.error);
      }
    } catch (error) {
      console.error("Error deleting budget:", error);
    }
  };

  // const handleOk = () => {
  //   setOpen(false);
  //   // setModalText("The modal will be closed after two seconds");
  //   // setConfirmLoading(true);
  //   // setTimeout(() => {
  //   //   setConfirmLoading(false);
  //   // }, 2000);
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const addUserData = { expense, price, expenseDate };

  //   const response = await fetch("http://localhost:5000/", {
  //     method: "POST",
  //     body: JSON.stringify(addUserData),
  //     headers: {
  //       "Content-Type": "appication/json",
  //     },
  //   });

  //   const result = await response.json();

  //   if (!response.ok) {
  //     console.log(result.error);
  //   }
  //   if (response.ok) {
  //     console.log(result);
  //   }
  // };
  // const handleCancel = () => {
  //   console.log("Clicked cancel button");
  //   setOpen(false);
  // };

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
      dataIndex: "date",
      key: "date",
      // filters: [{ date: "", value: "expenseDate" }],
      align: "center",
      render: (date) => format(new Date(date), "dd-MM-yyyy"),
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
            // onClick={() => handleDelete(record._id)}
            onClick={() => handleDelete(record._id)}
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
          // data={selectedItem}
          data={data}
          open={open}
          isEdit={isEdit}
          setOpen={setOpen}
          refreshData={fetchData}
        />
      </Flex>
      <Table
        style={{
          marginTop: "8px",
          // border: "1px solid",
          // borderColor: "#cac2c2",
        }}
        rowKey="_id"
        // key={key}
        dataSource={data?.length ? data : null}
        columns={columns}
        size="small"
      />
    </Flex>
  );
}

export default Home;
