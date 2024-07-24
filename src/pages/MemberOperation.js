import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import apiClient from "../utils/apiClient";
import "./MemberOperation.css";

const MemberOperation = () => {
  const [loading, setLoading] = useState(false);
  const userId = localStorage.getItem('username'); 
  const onFinish = async (values) => {
    setLoading(true);
    console.log("Member Update Request:",values);
    try {
      const requestBody = {
        ...values,
        userId, // Include userId in the request body
      };
        //const token = process.env.REACT_APP_JWT_TOKEN;
      const response = await apiClient.post(
        "api/addmember",
        requestBody
      );

      if (response.status === 200) {
        message.success("Member information updated successfully!");
      } else {
        message.error("Failed to update member information.");
      }
    } catch (error) {
      console.error("Error updating member information:", error);
      message.error("Failed to update member information.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="member-operation-container">
      <h1>Member Operation</h1>
      <Form onFinish={onFinish} layout="vertical">
        <Form.Item
          name="memberId"
          label="Member ID"
          rules={[{ required: true, message: "Please enter Member ID!" }]}
        >
          <Input placeholder="Enter Member ID" />
        </Form.Item>
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please enter Name!" }]}
        >
          <Input placeholder="Enter Name" />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: "Please enter Email!" }, { type: 'email', message: 'Please enter a valid Email!' }]}
        >
          <Input placeholder="Enter Email" />
        </Form.Item>
        <Form.Item
          name="points"
          label="Points"
          rules={[{ required: true, message: "Please enter Points!" }]}
        >
          <Input type="number" placeholder="Enter Points" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Update Member
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default MemberOperation;
