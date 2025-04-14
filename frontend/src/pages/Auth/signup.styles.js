import { Flex, Layout } from "antd";
import styled from "styled-components";
import signupImage from "../../assets/1.jpg";

export const StyledSignupLayout = styled(Layout)`
  align-items: center;
  background-color: #e2e7f1;
  min-height: 100vh;
`;

export const StyledSignupContainer = styled(Flex)`
  width: 100%;
  max-width: 600px;
  margin-block: 50px;
  background-color: #ffffff;
  padding: 18px;
  border-radius: 8px;
  box-shadow: 0px 4px 10px 4px;
  align-items: center;
  flex-wrap: wrap;
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

export const SignupImageContainer = styled(Flex)`
  margin-block: 14px;
  background-image: url(${signupImage});
  background-size: cover;
  background-position: center;
  padding: 18px;
  border-radius: 8px;
  margin: 14px;
  width: 50%;
  min-height: 40vh;
  justify-content: center;
  h3 {
    color: #fff;
    margin: 0;
  }
  @media (max-width: 768px) {
    width: 100%;
    min-height: 250px;
    h3 {
      font-size: 16px;
    }
  }
`;
