// frontend/src/pages/Dashboard.js

import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Statistic } from 'antd';
import { UserOutlined, LineChartOutlined } from '@ant-design/icons';
import apiClient from '../utils/apiClient';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './Dashboard.css';

const Dashboard = () => {
  const [totalMembers, setTotalMembers] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [transactionTrends, setTransactionTrends] = useState([]);
  const [totalPointsUpdated, setTotalPointsUpdated] = useState(0);
  const [transactionsThisMonth, setTransactionsThisMonth] = useState(0);
  const userId = localStorage.getItem('username'); 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const membersResponse = await apiClient.get(`/api/members?userId=${userId}`);
       setTotalMembers(membersResponse.data.length);

        const pointsResponse = await apiClient.get(`/api/totalpoints?userId=${userId}`);
        setTotalPoints(pointsResponse.data.totalPoints);

        const trendsResponse = await apiClient.get(`/api/trends?userId=${userId}`);
        console.log("trendsResponse.data.totalPointsUpdated",trendsResponse.data.totalPointsUpdated);
        console.log("trendsResponse.data.transactionsThisMonth",trendsResponse.data.transactionsThisMonth);
        console.log("trendsResponse.data.transactionData",trendsResponse.data.transactionData);
        setTotalPointsUpdated(trendsResponse.data.totalPointsUpdated);
        setTransactionsThisMonth(trendsResponse.data.transactionsThisMonth);
        setTransactionTrends(trendsResponse.data.transactionData);
      } catch (error) {
        console.error('Error fetching dashboard data', error);
      }
    };

    fetchData();
  },[userId]); 

  return (
    <div className="dashboard-container">
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic
              title="Total Members"
              value={totalMembers}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Total Points"
              value={totalPoints}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Transactions This Month"
              value={transactionsThisMonth}
              prefix={<LineChartOutlined />}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: '24px' }}>
        <Col span={8}>
          <Card>
            <Statistic
              title="Total Points Updated"
              value={totalPointsUpdated}
              prefix={<LineChartOutlined />}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: '24px' }}>
        <Col span={24}>
          <Card title="Transaction Trends">
            <ResponsiveContainer width="100%" height={400}>
              <LineChart
                data={transactionTrends}
                margin={{
                  top: 5, right: 30, left: 20, bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="created_at" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="points_updated" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
