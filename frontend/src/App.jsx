import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ConfigProvider, Flex, Layout, Spin } from "antd";
import { DataProvider } from "./context/DataContext";

const Auth = lazy(() => import("./components/Auth/Auth"));
const Login = lazy(() => import("./pages/Auth/Login"));
const Signup = lazy(() => import("./pages/Auth/Signup"));
const AppHeader = lazy(() => import("./components/AppHeader/AppHeader"));
const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
const Home = lazy(() => import("./pages/Home/Home"));
const Analytics = lazy(() => import("./pages/Analytics/Analytics"));

function App() {
  return (
    <Router>
      <ConfigProvider
        theme={{
          token: {
            fontFamily: "'serif'",
          },
        }}
      >
        <DataProvider>
          <Suspense
            fallback={
              <Flex justify="center" align="center" style={{ height: "100vh" }}>
                <Spin size="large" />
              </Flex>
            }
          >
            <Layout style={{ minHeight: "100vh", backgroundColor: "#E2E7F1" }}>
              {/* Common Header */}
              <AppHeader />
              <Routes>
                {/* Authentication Pages */}
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                {/* Protected Routes */}
                <Route
                  path="/dashboard"
                  element={
                    <Auth>
                      <Dashboard />
                    </Auth>
                  }
                >
                  <Route index element={<Home />} />
                  <Route path="analytics" element={<Analytics />} />
                </Route>
              </Routes>
            </Layout>
          </Suspense>
        </DataProvider>
      </ConfigProvider>
    </Router>
  );
}

export default App;
