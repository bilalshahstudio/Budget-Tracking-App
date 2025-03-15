import { Dropdown, Layout, Menu, Space, Typography } from "antd";
import {
  DollarCircleOutlined,
  DownOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
// import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";

const Dashboard = () => {
  const menuItems = [
    { key: "1", label: "Home", path: "/home", icon: <PieChartOutlined /> },
    {
      key: "2",
      label: "Add Budget",
      path: "/addBudget",
      icon: <DollarCircleOutlined />,
    },
  ];
  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Header */}

      {/* Sidebar */}
      <Sider width={200} theme="dark">
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          style={{ height: "100%", borderRight: 0 }}
        >
          {menuItems.map((item) => (
            <Menu.Item key={item.key} icon={item.icon}>
              <Link to={item.path}>{item.label}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>

      {/* Main Content */}
      <Layout style={{ padding: "20px" }}>
        <Content
          style={{ background: "#fff", padding: "20px", minHeight: 280 }}
        ></Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
