import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Flex, Layout, Spin } from "antd";
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
              <Route path="/" element={<Login />} />

              {/* Authentication Pages */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" exact element={<Signup />} />
              {/* Protected Routes */}
              <Route
                // path="/dashboard"
                exact
                element={
                  <Auth>
                    <Dashboard />
                  </Auth>
                }
              >
                <Route index element={<Home />} />
                <Route path="/analytics" element={<Analytics />} />
              </Route>
            </Routes>
          </Layout>
        </Suspense>
      </DataProvider>
    </Router>
  );
}

export default App;
