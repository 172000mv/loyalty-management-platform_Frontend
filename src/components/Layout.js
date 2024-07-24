import React, { useEffect, useState } from "react";
import { Layout, Menu, Button, Avatar } from "antd";
import { useNavigate, Outlet } from "react-router-dom";
import {
  DashboardOutlined,
  FormOutlined,
  HistoryOutlined,
  BellOutlined,
  UserOutlined,
  CreditCardOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import "./Layout.css";

const { Header, Content } = Layout;
const { SubMenu } = Menu;

const CustomLayout = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username"); // Remove username from local storage
    navigate("/login");
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header className="header">
        <div className="logo_inside">
          <span className="mobilytix">MobiLytix</span>
          <span className="rewards">Rewards</span>
        </div>
        <Menu theme="light" mode="horizontal" defaultSelectedKeys={["1"]}>
          <Menu.Item
            key="1"
            icon={<DashboardOutlined />}
            onClick={() => navigate("/")}
          >
            Dashboard
          </Menu.Item>
          <SubMenu key="sub1" icon={<FormOutlined />} title="Transaction Form">
            <Menu.Item
              key="2"
              icon={<CreditCardOutlined />}
              onClick={() => navigate("/transaction-form/points-operation")}
            >
              Points Operation
            </Menu.Item>
            <Menu.Item
              key="3"
              icon={<TeamOutlined />}
              onClick={() => navigate("/transaction-form/member-operation")}
            >
              Member Operation
            </Menu.Item>
          </SubMenu>
          <Menu.Item
            key="4"
            icon={<HistoryOutlined />}
            onClick={() => navigate("/transaction-history")}
          >
            Transaction History
          </Menu.Item>
        </Menu>
        <div className="header-right">
          <BellOutlined style={{ fontSize: "20px", marginRight: "20px" }} />
          <Avatar icon={<UserOutlined />} />
          <div className="user-info">
            <span className="username">{username}</span> {/* Display username */}
            <Button type="primary" onClick={logout} className="logout-button">
              Logout
            </Button>
          </div>
        </div>
      </Header>
      <Content style={{ margin: "24px 16px 0" }}>
        <div
          className="site-layout-background"
          style={{ padding: 24, minHeight: 360 }}
        >
          <Outlet />
        </div>
      </Content>
    </Layout>
  );
};

export default CustomLayout;
