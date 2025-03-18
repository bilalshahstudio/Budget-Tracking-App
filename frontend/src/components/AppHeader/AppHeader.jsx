import { DownOutlined } from "@ant-design/icons";
import { Button, Dropdown, Flex, Space, Typography } from "antd";
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
    <Header>
      <Flex justify="space-between" align="center">
        <Typography.Text style={{ color: "#fff" }}>
          Budget Tracking App
        </Typography.Text>
        <Dropdown
          menu={{
            items,
          }}
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              Hover me
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      </Flex>
    </Header>
  );
}

export default AppHeader;
