import React, { lazy, Suspense, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Login from "./pages/Auth/Login";
// import Signup from "./pages/Auth/Signup";
// import Dashboard from "./pages/Dashboard/Dashboard";
// import Home from "./pages/Home/Home";
// import Auth from "./components/Auth/Auth";
import { Flex, Layout, Spin } from "antd";
// import { DataProvider } from "./context/DataContext";
// import AppHeader from "./components/AppHeader/AppHeader";
// import Analytics from "./pages/Analytics/Analytics";

const Auth = lazy(() => import("./components/Auth/Auth"));
const Login = lazy(() => import("./pages/Auth/Login"));
const Signup = lazy(() => import("./pages/Auth/Signup"));
const AppHeader = lazy(() => import("./components/AppHeader/AppHeader"));
const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
const Home = lazy(() => import("./pages/Home/Home"));
const Analytics = lazy(() => import("./pages/Analytics/Analytics"));

function App() {
  const [userData, setUserData] = useState("");
  return (
    <Router>
      <Suspense
        fallback={
          <Flex justify="center" align="center" style={{ height: "100vh" }}>
            <Spin size="large" />
          </Flex>
        }
      >
        <Layout style={{ minHeight: "100vh", backgroundColor: "#E2E7F1" }}>
          {/* Common Header */}
          <AppHeader userData={userData} />
          <Routes>
            <Route path="/" element={<Login setUserData={setUserData} />} />

            {/* Authentication Pages */}
            <Route
              path="/login"
              element={<Login setUserData={setUserData} />}
            />
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
    </Router>
  );
}

export default App;
