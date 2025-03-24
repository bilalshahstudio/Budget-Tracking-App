import { Avatar, Dropdown, Flex, Space, Typography } from "antd";
import budgetLogo from "../../assets/pie.png";
import React from "react";
import { Link } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";

function AppHeader() {
  const items = [
    {
      key: "1",
      label: "My Account",
      disabled: true,
    },
    {
      type: "divider",
    },
    {
      key: "2",
      label: <Link to="/login">Logout</Link>,
    },
  ];
  return (
    <Flex
      justify="space-between"
      align="center"
      wrap
      style={{
        padding: "16px",
        border: "1px solid rgb(193, 197, 200)",
        marginBottom: "20px",
      }}
    >
      <Space align="center" wrap>
        <img
          src={budgetLogo}
          alt="Company Logo"
          style={{ height: "40px", marginRight: "10px" }}
        />
        <Typography.Title level={3}>Budget Tracking App</Typography.Title>
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
