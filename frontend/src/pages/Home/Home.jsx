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
import AddModal from "./AddModal";
import API from "../../api";
import { format } from "date-fns";
import StyledButton from "../../components/ButtonStyles/Button";

function Home() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

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
  }, []);

  const showModal = (item, isEdit) => {
    console.log(item);
    setOpen(true);
    setSelectedItem(item);
    setIsEdit(isEdit);
  };

  const handleFilter = () => {
    if (!selectedDate) return;

    const formattedSelectedDate = format(selectedDate.toDate(), "dd-MM-yyyy");

    const filteredData = data.filter((item) => {
      const itemDate = format(new Date(item.date), "dd-MM-yyyy");
      return itemDate === formattedSelectedDate;
    });

    setData(filteredData);
  };

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
          <DatePicker
            style={{ padding: "13px" }}
            onChange={(date) => setSelectedDate(date)}
          />
          <StyledButton onClick={handleFilter}>Filter Records</StyledButton>
        </Space>
        <StyledButton
          style={
            {
              // padding: "24px",
              // color: "#fff",
              // backgroundColor: "#000",
            }
          }
          onClick={() => showModal(null, false)}
        >
          Add Budget
        </StyledButton>
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
