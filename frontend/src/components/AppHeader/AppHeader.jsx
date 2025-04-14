import { Avatar, Dropdown, Flex, Space, Typography } from "antd";
import budgetLogo from "../../assets/pie.png";
import { Link } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { useData } from "../../context/DataContext";

function AppHeader() {
  const { data, handleLogout } = useData();
  console.log("Data", data.fName);

  const items = data?.fName
    ? [
        {
          key: "1",
          label: <span style={{ fontWeight: 500 }}>{data.fName}</span>,
          disabled: true,
        },
        {
          type: "divider",
        },
        {
          key: "2",
          label: (
            <Link to="/login" onClick={handleLogout}>
              Logout
            </Link>
          ),
        },
      ]
    : [];

  return (
    <Flex
      justify="space-between"
      align="center"
      wrap
      style={{
        padding: "16px",
        borderBottom: "1px solid rgb(193, 197, 200)",
        marginBottom: "20px",
        backgroundColor: "#fff",
        boxShadow: "0px 0px 5px 0px",
      }}
    >
      <Space align="center" wrap>
        <img
          src={budgetLogo}
          alt="Company Logo"
          style={{ height: "40px", marginRight: "10px" }}
        />
        <Typography.Title level={4}>Budget Tracker</Typography.Title>
      </Space>
      <Flex>
        <Dropdown
          menu={{
            items,
          }}
        >
          <Avatar
            size={"large"}
            style={{
              backgroundColor: "#FDC414",
            }}
            icon={<UserOutlined />}
          />
        </Dropdown>
      </Flex>
    </Flex>
  );
}

export default AppHeader;
