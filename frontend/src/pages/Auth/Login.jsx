import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {
  Button,
  Checkbox,
  Flex,
  Form,
  Input,
  Layout,
  Space,
  Typography,
} from "antd";
import { InputStyled } from "../../components/InputStyles/input.styles";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { PasswordStyled } from "../../components/PasswordStyles/password.styles";
import { ButtonStyled } from "../../components/ButtonStyles/button.styles";

function Login() {
  const navigate = useNavigate();
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

  const handleSubmit = async (values) => {
    const response = await axios.post("http://localhost:5000/login", values);

    if (response.status === 200) {
      localStorage.setItem("token", response.data.token);
      navigate("/");
    }
  };

  return (
    <Layout style={{ alignItems: "center", backgroundColor: "#E2E7F1" }}>
      <Flex
        className="content-container"
        align="center"
        style={{
          marginBlock: "50px",
          backgroundColor: "#fff",
          padding: "60px",
          borderRadius: "8px",
          boxShadow: "0 4px 10px 4px",
        }}
      >
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
          // onFinishFailed={onFinishFailed}
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
              {/* <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item> */}
              <Link to="/signup">Forgot password</Link>
            </Flex>
          </Form.Item>

          <Form.Item>
            <ButtonStyled
              block
              type="primary"
              htmlType="submit"
              // onClick={() => navigate("/")}
            >
              Log in
            </ButtonStyled>
            Don't have an account? <Link to="/signup">SignUp</Link>
          </Form.Item>
        </Form>
      </Flex>
    </Layout>
  );
}

export default Login;
