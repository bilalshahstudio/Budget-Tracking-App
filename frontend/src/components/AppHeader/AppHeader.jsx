import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Dropdown, Flex, Space, Typography } from "antd";
import { Header } from "antd/es/layout/layout";
import React from "react";

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
      label: <Button type="link">Logout</Button>,
      //   extra: "⌘P",
    },
  ];
  return (
    <Header style={{ alignContent: "center" }}>
      <Flex justify="space-between" align="center">
        <Typography.Text style={{ color: "#fff" }}>
          Budget Tracking App
        </Typography.Text>
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
