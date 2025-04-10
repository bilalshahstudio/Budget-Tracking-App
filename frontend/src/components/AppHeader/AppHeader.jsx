import { Avatar, Dropdown, Flex, Space, Typography } from "antd";
import budgetLogo from "../../assets/pie.png";
import React, { useEffect, useState } from "react";
import { data, Link, useLocation, useParams } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import API from "../../api";

function AppHeader({ userData }) {
  console.log("userData", userData);
  useEffect(() => {
    const fetchUserName = async function () {
      const response = await API.get(`/user_budget`);

      if (response.status === 200) {
        setUserName(response?.data?.fName);
      } else {
        console.log("Error:", result.error);
      }
    };

    fetchUserName();
  }, [userData]);
  const [userName, setUserName] = useState();

  const onhandleLogout = () => {
    localStorage.clear();
    setUserName("");
  };
  const items = [
    {
      key: "1",
      label: userName?.length ? userName : <Link to="/login">Login</Link>,
      // disabled: true,
    },
    {
      type: "divider",
    },
    {
      key: "2",
      label: userName?.length ? (
        <Link to="/login" onClick={onhandleLogout}>
          Logout
        </Link>
      ) : null,
    },
  ];

  return (
    <Flex
      justify="space-between"
      align="center"
      wrap
      style={{
        padding: "16px",
        borderBottom: "1px solid rgb(193, 197, 200)",
        marginBottom: "20px",
        backgroundColor: "#fff",
        boxShadow: "0px 0px 5px 0px",
      }}
    >
      <Space align="center" wrap>
        <img
          src={budgetLogo}
          alt="Company Logo"
          style={{ height: "40px", marginRight: "10px" }}
        />
        <Typography.Title level={4}>Budget Tracker</Typography.Title>
      </Space>
      <Flex>
        <Dropdown
          menu={{
            items,
          }}
        >
          <Avatar
            size={"large"}
            style={{
              backgroundColor: "#FDC414",
            }}
            icon={<UserOutlined />}
          />
        </Dropdown>
      </Flex>
    </Flex>
  );
}

export default AppHeader;
