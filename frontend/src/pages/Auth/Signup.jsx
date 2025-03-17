import React from "react";
import { Link, Navigate } from "react-router-dom";
import { Button, Checkbox, Flex, Form, Input, Typography, Upload } from "antd";

const Signup = () => {
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
          <Typography.Text>Create an Account</Typography.Text>
          <Typography.Text>
            Start Tracking your budget by entering your details below.
          </Typography.Text>
        </Flex>
        <Form
          // name="basic"
          name="signup"
          layout="vertical"
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
          // onFinish={handleSubmit}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
          validateMessages={validateMessages}
        >
          <Form.Item
            label="Image"
            valuePropName="fileList"
            // getValueFromEvent={normFile}
          >
            <Upload action="/upload.do" listType="picture-card">
              <button
                style={{
                  color: "inherit",
                  cursor: "inherit",
                  border: 0,
                  background: "none",
                }}
                type="button"
              >
                {/* <PlusOutlined /> */}+
                <div
                  style={{
                    marginTop: 8,
                  }}
                >
                  Upload
                </div>
              </button>
            </Upload>
          </Form.Item>
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder="John" />
          </Form.Item>
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

          {/* <Form.Item>
            <Flex justify="space-between" align="center">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <Link to="/forgotPassword">Forgot password</Link>
            </Flex>
          </Form.Item> */}

          <Form.Item>
            <Button
              block
              type="primary"
              htmlType="submit"
              onClick={<Navigate to="dashboard" />}
            >
              Sign Up
            </Button>
            Already have an account? <Link to="/login">Login</Link>
          </Form.Item>
        </Form>
      </Flex>
      <Flex>
        <h1>Image to Display</h1>
      </Flex>
    </Flex>
  );
};

export default Signup;
