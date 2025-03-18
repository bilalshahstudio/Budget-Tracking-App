import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Dashboard from "./pages/Dashboard/Dashboard";
import AddBudget from "./pages/AddBudget/AddBudget";
import Home from "./pages/Home/Home";
import Auth from "./components/Auth/Auth";
import { Layout } from "antd";
import AppHeader from "./components/AppHeader/AppHeader";

function App() {
  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
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
            <Route path="/addBudget" element={<AddBudget />} />
          </Route>
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
