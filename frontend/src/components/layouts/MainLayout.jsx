import { Layout, Typography } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import React from "react";
import { Outlet } from "react-router-dom";
import Dashboard from "../../pages/Dashboard/Dashboard";

function MainLayout() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Header */}
      <Header
        style={{ color: "white", fontSize: "20px", backgroundColor: "white" }}
        th
      >
        <Typography.Title>Dashboard</Typography.Title>
      </Header>
      <Content style={{ background: "#fff", padding: "20px", minHeight: 280 }}>
        <Dashboard />
      </Content>
    </Layout>
  );
}

export default MainLayout;
