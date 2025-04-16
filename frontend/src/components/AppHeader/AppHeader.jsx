import { Avatar, Button, Dropdown, Flex, Grid, Space, Typography } from "antd";
import budgetLogo from "../../assets/pie.png";
import { Link } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useData } from "../../context/DataContext";

// const { useBreakpoint } = Grid;

function AppHeader() {
  const { data, handleLogout, collapsed, setCollapsed, mobileView } = useData();

  // const mobileView = useBreakpoint();
  console.log("Data", data.fName);

  const toggleCollapsed = () => {
    setCollapsed((prev) => !prev);
  };

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
      <Flex align="center" gap="small" wrap>
        {mobileView.xs && data.fName && (
          <Button
            type="default"
            onClick={toggleCollapsed}

            // style={{ marginBottom: 16, marginLeft: 16 }}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>
        )}

        <img src={budgetLogo} alt="Company Logo" style={{ width: "40px" }} />

        <Typography.Title level={4}>Budget Tracker</Typography.Title>
      </Flex>
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
