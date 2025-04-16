import { Flex, Layout } from "antd";
import styled from "styled-components";

export const StyledLogin = styled(Layout)`
  align-items: center;
  background-color: #e2e7f1;
  min-height: 100vh;
`;

export const StyledLoginContainer = styled(Flex)`
  margin-block: 50px;
  background-color: #fff;
  padding: 60px;
  border-radius: 8px;
  box-shadow: 0 4px 10px 4px;
  @media (max-width: 600px) {
    flex-direction: column;
    margin-block: 20px;
    padding: 20px;
    width: 70%;
  }
`;

// alignItems: "center", backgroundColor: "#E2E7F1"

// marginBlock: "50px",
// backgroundColor: "#fff",
// padding: "60px",
// borderRadius: "8px",
// boxShadow: "0 4px 10px 4px",
