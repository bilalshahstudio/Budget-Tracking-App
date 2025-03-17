import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import React, { useState } from "react";
import Login from "../../../pages/Auth/Login";
import Dashboard from "../../../pages/Dashboard/Dashboard";

function Auth() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  return (
    <Layout>
      <Header>Header</Header>
      <Content>
        {isLoggedIn ? (
          <Dashboard isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        ) : (
          <Login />
        )}
      </Content>
    </Layout>
  );
}

export default Auth;
