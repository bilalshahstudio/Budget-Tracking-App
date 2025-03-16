import React from "react";
import { Button, Divider, Form, Input } from "antd";
import { LoginPageStyled } from "../../components/layouts/AuthLayout/authLayoutStyles";
import Password from "antd/es/input/Password";

function Login() {
  return (
    <LoginPageStyled>
      <div className="login-content-container ">
        {/* <img src={logo} className="animate__animated animate__fadeInLeft" /> */}
        <Divider
          type="vertical"
          style={{ height: "300px", marginRight: "70px" }}
        />
        <div>
          <h1 className="animate__animated animate__fadeIn">Login</h1>
          <Form
            // onFinish={handleSubmit}
            layout="vertical"
            initialValues={{ username: "admin", password: "admin123" }}
            style={{ width: 300 }}
            className="animate__animated animate__fadeInRightBig"
          >
            <Form.Item
              label="Username"
              name="username"
              required
              rules={[{ required: true, message: "This field is required." }]}
            >
              <Input placeholder="Username" type="text" />
            </Form.Item>
            <Form.Item label="Password" name="password" required>
              <Password
                style={{
                  background: "none",
                  borderRadius: 0,
                }}
                placeholder="Password"
              />
            </Form.Item>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form>
        </div>
      </div>
    </LoginPageStyled>
  );
}

export default Login;
