import { Link, useNavigate } from "react-router-dom";
import { Flex, Form, Layout, Typography } from "antd";
import { InputStyled } from "../../components/InputStyles/input.styles";
import { PasswordStyled } from "../../components/PasswordStyles/password.styles";
import { ButtonStyled } from "../../components/ButtonStyles/button.styles";
import API from "../../api";
import { useData } from "../../context/DataContext";
import { StyledLogin, StyledLoginContainer } from "./login.styles";

function Login() {
  const navigate = useNavigate();
  const { fetchData } = useData();
  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
    },
  };

  const handleSubmit = async (values) => {
    const response = await API.post("/login", values);

    if (response.status === 200) {
      localStorage.setItem("token", response?.data?.token);
      await fetchData();
      navigate("/");
    }
  };

  return (
    <StyledLogin>
      <StyledLoginContainer align="center">
        <Form
          // name="basic"
          name="login"
          labelCol={{
            span: 28,
          }}
          wrapperCol={{
            span: 25,
          }}
          style={{
            maxWidth: 600,
          }}
          // initialValues={
          //   {
          //     // remember: true,
          //     // email: "admin@gmail.com",
          //     // password: "admin123",
          //   }
          // }
          onFinish={handleSubmit}
          autoComplete="off"
          validateMessages={validateMessages}
        >
          <Form.Item>
            <Typography.Title>Welcome Back!</Typography.Title>
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
            <InputStyled placeholder="Email*" />
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
            <PasswordStyled placeholder="Min 8 characters" />
          </Form.Item>

          <Form.Item>
            <Flex justify="space-between" align="center">
              <Link to="/signup">Forgot password</Link>
            </Flex>
          </Form.Item>

          <Form.Item>
            <ButtonStyled block type="primary" htmlType="submit">
              Log in
            </ButtonStyled>
            Don't have an account? <Link to="/signup">SignUp</Link>
          </Form.Item>
        </Form>
      </StyledLoginContainer>
    </StyledLogin>
  );
}

export default Login;
