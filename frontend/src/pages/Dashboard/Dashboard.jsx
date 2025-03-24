import { Layout, Menu } from "antd";
import { DollarCircleOutlined, PieChartOutlined } from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { Link, Outlet } from "react-router-dom";
import { DataProvider } from "../../context/DataContext";

const Dashboard = () => {
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
      <Layout style={{ minHeight: "100vh", backgroundColor: "#E2E8F0" }}>
        {/* Header */}

        {/* Sidebar */}
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          width={200}
          theme="dark"
          style={{ marginTop: "20px" }}
        >
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
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </DataProvider>
  );
};

export default Dashboard;
