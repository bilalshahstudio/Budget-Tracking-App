import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import React, { useState } from "react";
import Login from "../../../pages/Auth/Login";
import Dashboard from "../../../pages/Dashboard/Dashboard";
import MainLayout from "../MainLayout";

function Auth() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  return (
    <Layout>
      <Header>Header</Header>
      <Content>
        {isLoggedIn ? (
          <MainLayout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        ) : (
          <Login />
        )}
      </Content>
    </Layout>
  );
}

export default Auth;
