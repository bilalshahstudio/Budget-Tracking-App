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

export default Login;
