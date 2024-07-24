import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, message } from "antd";
import apiClient from "../utils/apiClient"; // Import the configured axios instance
import "./PointsOperation.css";


const { Option } = Select;

const PointsOperation = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const userId = localStorage.getItem('username'); 
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await apiClient.get(`/api/members?userId=${userId}`);
        setMembers(response.data);
      } catch (error) {
        console.error("Error fetching members:", error);
        message.error("Failed to load members.");
      }
    };

    fetchMembers();
  }, [userId]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const requestData = {
        member_id: values.member_id,
        name: members.find((member) => member.memberId === values.member_id).name,
        operationType: values.operation_type,
        points: values.points,
        userId: userId
      };
      console.log("Points Update with values:", requestData);
      const response = await apiClient.post("/api/points", requestData);

      if (response.status === 200) {
        message.success("Points updated successfully!");
      } else {
        message.error("Failed to update points.");
      }
    } catch (error) {
      console.error("Error updating points:", error);
      message.error("Failed to update points.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="points-operation-container">
      <h1>Points Operation</h1>
      <Form onFinish={onFinish} layout="vertical">
      <Form.Item
  name="member_id"
  label="Select Member"
  rules={[{ required: true, message: "Please select a member!" }]}
>
  <Select placeholder="Select a member">
    {members.map((member) => (
      <Option key={member.memberId} value={member.memberId}>
        {`${member.memberId} - ${member.name}`}
      </Option>
    ))}
  </Select>
</Form.Item>

        <Form.Item
          name="operation_type"
          label="Operation Type"
          rules={[{ required: true, message: "Please select an operation type!" }]}
        >
          <Select placeholder="Select an operation type">
            <Option value="credit">Credit</Option>
            <Option value="debit">Debit</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="points"
          label="Points"
          rules={[{ required: true, message: "Please enter points!" }]}
        >
          <Input type="number" placeholder="Enter points" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Update Points
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};



export default PointsOperation;
