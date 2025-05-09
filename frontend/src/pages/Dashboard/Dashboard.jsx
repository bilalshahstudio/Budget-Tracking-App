import { Layout, Menu } from "antd";
import { DollarCircleOutlined, PieChartOutlined } from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { Link, Outlet } from "react-router-dom";
import { DataProvider, useData } from "../../context/DataContext";

const Dashboard = () => {
  const { collapsed, setCollapsed, mobileView } = useData();

  const menuItems = [
    {
      key: "1",
      label: "Home",
      path: "/dashboard",
      icon: <PieChartOutlined />,
    },
    {
      key: "2",
      label: "Analytics",
      path: "analytics",
      icon: <DollarCircleOutlined />,
    },
  ];

  return (
    <DataProvider>
      <Layout>
        {((mobileView.xs && collapsed) || !mobileView.xs) && (
          <Sider
            collapsible
            collapsed={collapsed}
            breakpoint="md"
            theme="light"
            style={{ paddingTop: 20 }}
          >
            <Menu
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              mode="inline"
              theme="light"
              inlineCollapsed={collapsed}
            >
              {menuItems.map((item) => (
                <Menu.Item key={item.key} icon={item.icon}>
                  <Link to={item.path}>{item.label}</Link>
                </Menu.Item>
              ))}
            </Menu>
          </Sider>
        )}

        <Layout>
          <Content
            style={{
              background: `${mobileView.xs ? "#F6F6F6" : "#fff"}`,

              padding: "20px 8px 0px 8px",
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
