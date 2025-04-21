<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> b8ad078 (ui changes)
import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import React, { useState } from "react";
import Login from "../../../pages/Auth/Login";
import Dashboard from "../../../pages/Dashboard/Dashboard";
<<<<<<< HEAD
<<<<<<< HEAD
=======
import MainLayout from "../MainLayout";
>>>>>>> 166135c (login and table view)

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
=======
import React from "react";
import AuthLayoutStyled from "./authLayoutStyles";
=======
>>>>>>> b8ad078 (ui changes)

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

<<<<<<< HEAD
export default AuthLayout;
>>>>>>> d859e4a (ant design and pages setup)
=======
export default Auth;
>>>>>>> b8ad078 (ui changes)
