import React from 'react';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { useNavigate, Link } from 'react-router-dom'; 
import apiClient  from '../utils/apiClient';
import './Login.css';
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import logo from "../comviva_logo.png";
import logoText from "../comviva_logo_text.png";



const Login = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const { remember, ...loginValues } = values;
    try {
      console.log("Submitting login with values:", loginValues);
      

      const response = await apiClient.post("/api/login", loginValues);
      console.log("Login response:", response);
      

      if (response.status === 200) {
        message.success("Login successful!");

        // Store the token and username in localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('username', loginValues.user); // Store the username

        // Navigate to the main page
        navigate("/");
      } else {
        console.log("Login failed with status:", response.status);
        message.error("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      message.error("Login failed. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
        <img src={logoText} alt="Comviva Logo Text" className="logo-text" />
      </div>
      <div className="login-form">
        <h1>Login</h1>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="user"
            rules={[{ required: true, message: "Please input your User Name!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="User Name"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
            Don't have an account? <Link to="/register">register now!</Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;