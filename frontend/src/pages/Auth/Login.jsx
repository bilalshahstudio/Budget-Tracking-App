<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import { Link, Navigate } from "react-router-dom";
import { Button, Checkbox, Flex, Form, Input, Typography } from "antd";

<<<<<<< HEAD
function Login() {
  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      // number: "${label} is not a valid number!",
    },
    // number: {
    //   range: "${label} must be between ${min} and ${max}",
    // },
  };
  return (
    <Flex justify="space-around" align="center">
      <Flex vertical>
        <Typography.Text>Budget Tracking App</Typography.Text>
        <Flex vertical>
          <Typography.Text>Welcome Back</Typography.Text>
          <Typography.Text>Please enter your details to login</Typography.Text>
        </Flex>
        <Form
          // name="basic"
          name="login"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={
            {
              // maxWidth: 600,
            }
          }
          initialValues={{
            remember: true,
            email: "admin@gmail.com",
            password: "admin123",
          }}
          // onFinish={handleSubmit}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
          validateMessages={validateMessages}
        >
          <Form.Item
            name={["user", "email"]}
            label="Email"
            rules={[
              {
                type: "email",
                required: true,
              },
            ]}
          >
            <Input placeholder="john@example.com" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password placeholder="Min 8 characters" />
          </Form.Item>

          <Form.Item>
            <Flex justify="space-between" align="center">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <Link to="/forgotPassword">Forgot password</Link>
            </Flex>
          </Form.Item>

          <Form.Item>
            <Button
              block
              type="primary"
              htmlType="submit"
              onClick={<Navigate to="dashboard" />}
            >
              Log in
            </Button>
            Don't have an account? <Link to="/signup">SignUp</Link>
          </Form.Item>
        </Form>
      </Flex>
      <Flex>
        <h1>Image to Display</h1>
      </Flex>
    </Flex>
  );
}
=======
const Login = () => {
=======
import React from "react";
import { Button, Divider, Form, Input } from "antd";
import { LoginPageStyled } from "../../components/layouts/AuthLayout/authLayoutStyles";
import Password from "antd/es/input/Password";

function Login() {
>>>>>>> d859e4a (ant design and pages setup)
=======
import { Link, Navigate } from "react-router-dom";
import { Button, Checkbox, Flex, Form, Input, Typography } from "antd";

function Login() {
  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      // number: "${label} is not a valid number!",
    },
    // number: {
    //   range: "${label} must be between ${min} and ${max}",
    // },
  };
>>>>>>> b8ad078 (ui changes)
  return (
    <Flex justify="space-around" align="center">
      <Flex vertical>
        <Typography.Text>Budget Tracking App</Typography.Text>
        <Flex vertical>
          <Typography.Text>Welcome Back</Typography.Text>
          <Typography.Text>Please enter your details to login</Typography.Text>
        </Flex>
        <Form
          // name="basic"
          name="login"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={
            {
              // maxWidth: 600,
            }
          }
          initialValues={{
            remember: true,
            email: "admin@gmail.com",
            password: "admin123",
          }}
          // onFinish={handleSubmit}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
          validateMessages={validateMessages}
        >
          <Form.Item
            name={["user", "email"]}
            label="Email"
            rules={[
              {
                type: "email",
                required: true,
              },
            ]}
          >
            <Input placeholder="john@example.com" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password placeholder="Min 8 characters" />
          </Form.Item>

          <Form.Item>
            <Flex justify="space-between" align="center">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <Link to="/forgotPassword">Forgot password</Link>
            </Flex>
          </Form.Item>

          <Form.Item>
            <Button
              block
              type="primary"
              htmlType="submit"
              onClick={<Navigate to="dashboard" />}
            >
              Log in
            </Button>
            Don't have an account? <Link to="/signup">SignUp</Link>
          </Form.Item>
        </Form>
      </Flex>
      <Flex>
        <h1>Image to Display</h1>
      </Flex>
    </Flex>
  );
<<<<<<< HEAD
};
>>>>>>> d6a3720 (removal of unnecessary npm packages)
=======
}
>>>>>>> d859e4a (ant design and pages setup)

export default Login;
=======
import React from "react";

function login() {
  return <div>login</div>;
}

export default login;
>>>>>>> 11593fb (frontend initial setup)
