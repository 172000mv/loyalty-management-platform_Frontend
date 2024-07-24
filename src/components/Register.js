import React from "react";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import logo from "../comviva_logo.png";
import logoText from "../comviva_logo_text.png";
import apiClient from '../utils/apiClient';

const Register = () => {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    const { confirm, ...registerValues } = values;
    try {
      console.log("Submitting Register with values:", registerValues);
      const response = await apiClient.post("api/register", registerValues);
      if (response.status === 200) {
        message.success('Registration successful!');
        // Redirect to login page after successful registration
        navigate("/login");
      } else {
        message.error('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      message.error('Registration failed. Please try again.');
    }
  };

  return (
    <div className="register-container">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
        <img src={logoText} alt="Comviva Logo Text" className="logo-text" />
      </div>
      <div className="register-form">
        <h1>Register</h1>
        <Form
          name="register"
          className="register-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="user"
            rules={[{ required: true, message: "Please input your user!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="UserName"
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please input a valid Email!",
              },
            ]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Email"
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
          <Form.Item
            name="confirm"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your Password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Confirm Password"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="register-form-button"
            >
              Register
            </Button>
            Already have an account? <Link to="/login">Login now!</Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Register;
