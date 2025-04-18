import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Flex, Form, Typography } from "antd";
import { InputStyled } from "../../components/InputStyles/input.styles";
import { ButtonStyled } from "../../components/ButtonStyles/button.styles";
import API from "../../api";
import {
  SignupImageContainer,
  StyledSignupContainer,
  StyledSignupLayout,
} from "./signup.styles";
import { useData } from "../../context/DataContext";
import Password from "antd/es/input/Password";

const Signup = () => {
  const { mobileView } = useData();
  const navigate = useNavigate();
  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
    },
  };

  const handleSubmit = async (values) => {
    const { password, confirmPassword } = values;

    if (password === confirmPassword) {
      const response = await API.post("/register", {
        ...values,
      });

      if (response?.status === 201) {
        navigate("/login");
      }
    } else {
      console.log("password dosen't match");
    }
  };

  return (
    <StyledSignupLayout>
      <StyledSignupContainer>
        {!mobileView.xs && (
          <SignupImageContainer>
            <Typography.Title level={3}>
              Start your Journey With Us
            </Typography.Title>
          </SignupImageContainer>
        )}
        <Flex>
          <Form
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
            }}
            onFinish={handleSubmit}
            autoComplete="off"
            validateMessages={validateMessages}
          >
            <Form.Item>
              <Typography.Text strong>Signup!</Typography.Text>
              <br />
              <Typography.Text>
                Already have an account? <Link to="/login">Login</Link>
              </Typography.Text>
              {/* </Flex> */}
            </Form.Item>
            <Form.Item
              name="fName"
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
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Password placeholder="password" />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              rules={[
                {
                  required: true,
                  message: "Confirm password!",
                },
              ]}
            >
              <Password placeholder="confirm password" />
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
          </Form>
        </Flex>
      </StyledSignupContainer>
    </StyledSignupLayout>
  );
};

export default Signup;
