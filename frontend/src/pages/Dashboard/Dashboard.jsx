import { Button, Layout, Menu } from "antd";
import {
  DollarCircleOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { Link, Outlet } from "react-router-dom";
import { DataProvider } from "../../context/DataContext";
import { useState } from "react";

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const menuItems = [
    {
      key: "1",
      label: "Home",
      path: "/",
      icon: <PieChartOutlined />,
    },
    {
      key: "2",
      label: "Analytics",
      path: "/analytics",
      icon: <DollarCircleOutlined />,
    },
  ];
  return (
    <DataProvider>
      <Layout
      // style={{ minHeight: "100vh", flexWrap: "wrap" }}
      >
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          breakpoint="md"
          // collapsedWidth="0"
          // width={200}
          theme="light"
          style={{ paddingTop: 20 }}
        >
          {/* <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            style={{ borderRight: 0 }}
          >
            {menuItems.map((item) => (
              <Menu.Item key={item.key} icon={item.icon}>
                <Link to={item.path}>{item.label}</Link>
              </Menu.Item>
            ))}
          </Menu> */}
          {/* <div style={{ width: 256 }}> */}
          <Button
            type="default"
            onClick={toggleCollapsed}
            style={{ marginBottom: 16, marginLeft: 16 }}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>
          <Menu
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            mode="inline"
            theme="light"
            inlineCollapsed={collapsed}
            // items={items}
          >
            {menuItems.map((item) => (
              <Menu.Item key={item.key} icon={item.icon}>
                <Link to={item.path}>{item.label}</Link>
              </Menu.Item>
            ))}
          </Menu>
          {/* </div> */}
        </Sider>

        {/* Main Content */}
        <Layout>
          <Content
            style={{
              background: "#fff",
              padding: 20,
              // paddingTop: 60,
              minHeight: 280,
              overflowX: "auto",
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </DataProvider>
  );
};

export default Dashboard;
