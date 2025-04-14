import React from "react";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Flex, Form, Layout, Space, Typography } from "antd";
import { InputStyled } from "../../components/InputStyles/input.styles";
import { PasswordStyled } from "../../components/PasswordStyles/password.styles";
import { ButtonStyled } from "../../components/ButtonStyles/button.styles";
import signupImage from "../../assets/1.jpg";
import API from "../../api";
import {
  SignupImageContainer,
  StyledSignupContainer,
  StyledSignupLayout,
} from "./signup.styles";

const Signup = () => {
  const navigate = useNavigate();
  // const { signup } = userData();
  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
    },
  };

  const handleSubmit = async (values) => {
    console.log(values);

    const { password, confirmPassword } = values;

    if (password === confirmPassword) {
      console.log(values);
      const response = await API.post("/register", {
        ...values,
      });

      if (response?.status === 201) {
        console.log(response?.data);
        navigate("/login");
      }
    } else {
      console.log("password dosen't match");
    }
  };

  return (
    <StyledSignupLayout>
      <StyledSignupContainer>
        <SignupImageContainer>
          <Typography.Title level={3}>
            Start your Journey With Us
          </Typography.Title>
        </SignupImageContainer>
        <Flex>
          <Form
            // name="basic"
            name="signup"
            layout="vertical"
            labelCol={{
              span: 12,
            }}
            wrapperCol={{
              span: 24,
            }}
            style={{
              paddingInline: "14px",
              // flex: 1,
            }}
            onFinish={handleSubmit}
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
            validateMessages={validateMessages}
          >
            {/* <Space direction="vertical" size="small"> */}
            <Form.Item>
              {/* <Flex vertical> */}
              <Typography.Text strong>Signup!</Typography.Text>
              <br />
              <Typography.Text>
                Already have an account? <Link to="/login">Login</Link>
              </Typography.Text>
              {/* </Flex> */}
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
              name="email"
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
            <Form.Item
              name="budgetLimit"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <InputStyled placeholder="Budget Limit" />
            </Form.Item>
            <Form.Item>
              <ButtonStyled
                block
                type="primary"
                htmlType="submit"
                onClick={<Navigate to="dashboard" />}
              >
                Submit
              </ButtonStyled>
            </Form.Item>
            {/* </Space> */}
          </Form>
        </Flex>
      </StyledSignupContainer>
    </StyledSignupLayout>
  );
};

export default Signup;
