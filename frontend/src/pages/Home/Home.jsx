import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import API from "../../api";
import {
  Button as AntBtn,
  Button,
  DatePicker,
  Dropdown,
  Flex,
  Grid,
  Popconfirm,
  Space,
  Table,
  Typography,
  notification,
} from "antd";
import {
  DeleteFilled,
  EditFilled,
  FilterOutlined,
  MenuOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import AddModal from "./AddModal";
import StyledButton from "../../components/ButtonStyles/Button";
import BudgetCard from "../../components/Card/BudgetCard";
import { useData } from "../../context/DataContext";
import { Link } from "react-router-dom";

// const { useBreakpoint } = Grid;

function Home() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const { mobileView } = useData();

  const [api, contextHolder] = notification.useNotification();

  const openNotification = (type, message, description) => {
    api[type]({
      message,
      description,
      placement: "topRight",
      // zIndex: 9999,
    });
  };

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

  const showModal = (record, isEdit) => {
    setOpen(true);
    setSelectedItem(record);
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
        openNotification("success", "Deleted", "Budget deleted successfully.");

        // Update state to remove the deleted item from the list
        setData((prevData) => prevData.filter((item) => item._id !== budgetId));
      } else {
        openNotification(
          "error",
          "Error",
          "An error occurred while deleting the budget."
        );
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
          <Button
            onClick={() => showModal(record, true)}
            type="link"
            icon={<EditFilled />}
          >
            Edit
          </Button>
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" icon={<DeleteFilled />} danger>
              Delete
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];
  return (
    <Flex
      // justify="center"
      vertical
    >
      {contextHolder}
      <Flex justify="space-between" wrap gap="small">
        <Space wrap>
          <DatePicker
            in
            style={{
              paddingBlock: `${mobileView.xs ? "6px" : "8px"}`,
              // width: `${mobileView.xs ? "100px" : "140px"}`,
              // fontSize: "14px",
            }}
            onChange={(date) => setSelectedDate(date)}
          />
          <Button
            type="default"
            style={{
              width: "50px",
              padding: "18px",
              // width: `${mobileView.xs ? "100px" : "150px"}`,
              // paddingBlock: `${mobileView.xs ? "16px" : "18px"}`,
            }}
            onClick={handleFilter}
            icon={<FilterOutlined />}
          />
        </Space>
        <StyledButton
          style={
            {
              // width: `${mobileView.xs ? "100px" : "150px"}`,
              // paddingBlock: `${mobileView.xs ? "16px" : "18px"}`,
            }
          }
          type="primary"
          // icon={<PlusOutlined />}
          onClick={() => showModal(null, false)}
        >
          <PlusOutlined /> Add Budget
        </StyledButton>

        <AddModal
          data={selectedItem}
          open={open}
          isEdit={isEdit}
          setOpen={setOpen}
          refreshData={fetchData}
          showNotification={openNotification}
        />
      </Flex>
      {mobileView.xs ? (
        <Flex
          vertical
          gap="small"
          style={{
            marginTop: "16px",
            backgroundColor: "#F6F6F6",
          }}
        >
          {data?.map((item) => {
            const items = [
              {
                key: "1",
                label: (
                  <Button
                    onClick={() => showModal(item, true)}
                    type="link"
                    icon={<EditFilled />}
                  >
                    Edit
                  </Button>
                ),
              },
              {
                key: "2",
                label: (
                  <Popconfirm
                    title="Delete the task"
                    description="Are you sure to delete this task?"
                    onConfirm={() => handleDelete(item._id)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button
                      // onClick={() => handleDelete(item._id)}
                      type="link"
                      icon={<DeleteFilled />}
                      danger
                    >
                      Delete
                    </Button>
                  </Popconfirm>
                ),
              },
            ];
            return (
              <BudgetCard
                key={item._id}
                title={
                  <Typography.Title level={5}>
                    {item.budgetName}
                  </Typography.Title>
                }
                // extra={<a href="#">more</a>}
                extra={
                  <Dropdown.Button menu={{ items }}>
                    <Typography.Text strong>Actions</Typography.Text>
                    {/* <Button icon={<MenuOutlined />} shape="circle"></Button> */}
                  </Dropdown.Button>
                }
              >
                <Flex vertical>
                  <Space style={{ justifyContent: "space-between" }}>
                    <Typography.Title level={5} strong>
                      Name
                    </Typography.Title>
                    <Typography.Title level={5}>
                      {item.budgetName}
                    </Typography.Title>
                  </Space>
                  <Space style={{ justifyContent: "space-between" }}>
                    <Typography.Title level={5} strong>
                      Price
                    </Typography.Title>
                    <Typography.Title level={5}>{item.price}</Typography.Title>
                  </Space>
                  <Space style={{ justifyContent: "space-between" }}>
                    <Typography.Title level={5} strong>
                      Date
                    </Typography.Title>
                    <Typography.Title level={5}>
                      {format(new Date(item.date), "dd-MM-yyyy")}
                    </Typography.Title>
                  </Space>
                </Flex>
              </BudgetCard>
            );
          })}
        </Flex>
      ) : (
        <Table
          style={{
            marginTop: "8px",
          }}
          rowKey="_id"
          scroll={{ x: "max-content" }}
          dataSource={data?.length ? data : null}
          columns={columns}
          size="small"
        />
      )}
    </Flex>
  );
}

export default Home;
