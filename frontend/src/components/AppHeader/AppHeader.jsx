import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Dropdown, Flex, Space, Typography } from "antd";
import { Header } from "antd/es/layout/layout";
import budgetLogo from "../../assets/logo3.png";
import React from "react";
import { Link } from "react-router-dom";

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
      //   extra: "⌘P",
    },
  ];
  return (
    <Header style={{ alignContent: "center" }}>
      <Flex justify="space-between" align="center">
        <Flex align="center">
          <img
            src={budgetLogo}
            alt="Company Logo"
            style={{ height: "40px", marginRight: "10px" }}
          />
          <Typography.Text style={{ color: "#fff", fontSize: "24px" }}>
            Budget Tracking App
          </Typography.Text>
        </Flex>
        <Dropdown
          menu={{
            items,
          }}
        >
          {/* <a onClick={(e) => e.preventDefault()}>
            <Space>
              Hover me
              <DownOutlined />
            </Space>
          </a> */}
          <Avatar
            style={{
              backgroundColor: "#87d068",
            }}
            // icon={<UserOutlined />}
            src="https://api.dicebear.com/7.x/miniavs/svg?seed=2"
          />
        </Dropdown>
      </Flex>
    </Header>
  );
}

export default AppHeader;
