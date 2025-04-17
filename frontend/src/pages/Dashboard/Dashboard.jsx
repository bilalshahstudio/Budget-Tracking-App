import { Button, Grid, Layout, Menu } from "antd";
import {
  DollarCircleOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { Link, Outlet } from "react-router-dom";
import { DataProvider, useData } from "../../context/DataContext";

// const { useBreakpoint } = Grid;

const Dashboard = () => {
  const { collapsed, setCollapsed, mobileView } = useData();

  // const mobileView = useBreakpoint();
  console.log(collapsed);
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
  console.log("trueeeee", (mobileView.xs && collapsed) || !mobileView.xs);
  console.log("mobileView with not", !mobileView.xs);
  console.log("mobileView without not", mobileView.xs);

  console.log("collapsed", collapsed);

  return (
    <DataProvider>
      <Layout>
        {((mobileView.xs && collapsed) || !mobileView.xs) && (
          <Sider
            collapsible
            collapsed={collapsed}
            // onCollapse={!mobileView.xs && setCollapsed(collapsed)}
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
            {/* </div> */}
          </Sider>
        )}

        {/* Main Content */}
        <Layout>
          <Content
            style={{
              background: `${mobileView.xs ? "#F6F6F6" : "#fff"}`,

              // background: "#E2E7F1",
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
