import React from "react";
import { Link, Navigate } from "react-router-dom";
import {
  Button,
  Checkbox,
  Divider,
  Flex,
  Form,
  Input,
  Layout,
  Typography,
  Upload,
} from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { InputStyled } from "../../components/InputStyles/input.styles";
import Password from "antd/es/input/Password";
import { PasswordStyled } from "../../components/PasswordStyles/password.styles";
import { ButtonStyled } from "../../components/ButtonStyles/button.styles";
import loginImg from "../../assets/3.jpg";

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
    <Layout>
      <Header style={{ backgroundColor: "#fff", borderBottomColor: "#928b8b" }}>
        <Typography.Title>Budget Tracking App</Typography.Title>
      </Header>
      <Content
        style={{
          justifyItems: "center",
          alignItems: "center",
          backgroundColor: "#E2E8F0",
        }}
      >
        <Flex
          align="center"
          gap={20}
          style={{
            backgroundColor: "#fff",
            marginInline: "15%",
            padding: 12,
            marginTop: "14px",
            borderRadius: "12px",
          }}
        >
          <Flex
            style={{
              backgroundColor: "yellow",
              width: "100%",
              height: "51vh",
              borderRadius: "12px",
              alignItems: "center",
              paddingInline: "18px",
            }}
          >
            <Typography.Text strong>Start your journey with us</Typography.Text>
            {/* <img
              style={{ width: "100", borderRadius: "16px", objectFit: "cover" }}
              src={loginImg}
              alt="signin"
            /> */}
          </Flex>
          <Form
            // name="basic"
            name="signup"
            layout="vertical"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 25,
            }}
            style={
              {
                // flex: 1,
              }
            }
            // onFinish={handleSubmit}
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
            validateMessages={validateMessages}
          >
            <Form.Item>
              Already have an account? <Link to="/login">Login</Link>
            </Form.Item>
            <Form.Item
              name="fName"
              // label="First Name"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <InputStyled placeholder="John" />
            </Form.Item>
            <Form.Item
              name="lName"
              // label="Last Name"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <InputStyled placeholder="John" />
            </Form.Item>
            <Form.Item
              name={["user", "email"]}
              // label="Email"
              rules={[
                {
                  type: "email",
                  required: true,
                },
              ]}
            >
              <InputStyled placeholder="john@example.com" />
            </Form.Item>

            <Form.Item
              // label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <PasswordStyled placeholder="password" />
            </Form.Item>
            <Form.Item
              // label="Confirm Password"
              name="confirmPassword"
              rules={[
                {
                  required: true,
                  message: "Confirm password!",
                },
              ]}
            >
              <PasswordStyled placeholder="confirm password" />
            </Form.Item>
            <Form.Item>
              <ButtonStyled
                block
                type="primary"
                htmlType="submit"
                onClick={<Navigate to="dashboard" />}
              >
                Sign Up
              </ButtonStyled>
            </Form.Item>
          </Form>
        </Flex>
      </Content>
    </Layout>
  );
};

export default Signup;
