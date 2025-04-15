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
  Space,
  Table,
  Typography,
  notification,
} from "antd";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import AddModal from "./AddModal";
import StyledButton from "../../components/ButtonStyles/Button";
import BudgetCard from "../../components/Card/BudgetCard";

const { useBreakpoint } = Grid;

function Home() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const mobileView = useBreakpoint();
  console.log(data);

  const [api, contextHolder] = notification.useNotification();

  const openNotification = (type, message, description) => {
    console.log(message);
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
      // navigate("/login");
      // fetchData();
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const showModal = (record, isEdit) => {
    console.log(record);
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
        console.log("Budget deleted successfully:", response.data);
        openNotification("success", "Deleted", "Budget deleted successfully.");

        // Update state to remove the deleted item from the list
        setData((prevData) => prevData.filter((item) => item._id !== budgetId));
      } else {
        console.log(response.data.error);
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
          <AntBtn
            onClick={() => showModal(record, true)}
            type="link"
            icon={<EditFilled />}
          >
            Edit
          </AntBtn>
          <AntBtn
            onClick={() => handleDelete(record._id)}
            type="link"
            icon={<DeleteFilled />}
            danger
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
    >
      {contextHolder}
      <Flex justify="space-between" wrap gap="small">
        <Space wrap>
          <DatePicker
            style={{ padding: "8px" }}
            onChange={(date) => setSelectedDate(date)}
          />
          <StyledButton type="primary" onClick={handleFilter}>
            Filter Records
          </StyledButton>
        </Space>
        <StyledButton type="primary" onClick={() => showModal(null, false)}>
          Add Budget
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
        <Flex vertical gap="small" style={{ marginTop: "16px" }}>
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
                  <Button
                    onClick={() => handleDelete(item._id)}
                    type="link"
                    icon={<DeleteFilled />}
                    danger
                  >
                    Delete
                  </Button>
                ),
              },
            ];
            return (
              <BudgetCard
                key={item._id}
                title={item.budgetName}
                // extra={<a href="#">more</a>}
                extra={<Dropdown menu={{ items }}>More</Dropdown>}
              >
                <Flex vertical>
                  <Space>
                    <Typography.Text strong>Name :</Typography.Text>
                    <Typography.Text>{item.budgetName}</Typography.Text>
                  </Space>
                  <Space>
                    <Typography.Text strong>Price :</Typography.Text>
                    <Typography.Text>{item.price}</Typography.Text>
                  </Space>
                  <Space>
                    <Typography.Text strong>Date :</Typography.Text>
                    <Typography.Text>
                      {format(new Date(item.date), "dd-MM-yyyy")}
                    </Typography.Text>
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
