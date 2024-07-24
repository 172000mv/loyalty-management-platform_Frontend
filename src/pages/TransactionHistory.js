import React, { useState, useEffect, useRef } from "react";
import { Table, Input, Button, message } from "antd";
import apiClient from "../utils/apiClient";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import "./TransactionHistory.css";

const { Search } = Input;

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const userId = localStorage.getItem('username');
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await apiClient.get(`/api/transactions?userId=${userId}`);

        if (response.status === 200) {
          setTransactions(response.data);
        } else {
          message.error("Failed to load transactions.");
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
        message.error("Failed to load transactions.");
      }
    };

    fetchTransactions();
  }, [userId]); 

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    if (!selectedKeys[0]) {
      handleReset(confirm);
    } else {
      setSearchText(selectedKeys[0]);
      setSearchedColumn(dataIndex);
    }
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
    setSearchedColumn("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : "",
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "Member ID",
      dataIndex: "member_id",
      key: "member_id",
      ...getColumnSearchProps("member_id"),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Points Updated",
      dataIndex: "points_updated",
      key: "points_updated",
      ...getColumnSearchProps("points_updated"),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      ...getColumnSearchProps("type"),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      ...getColumnSearchProps("status"),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ...getColumnSearchProps("description"),
    },
  ];

  return (
    <div className="transaction-history-container">
      <h1>Transaction History</h1>
      <Search
        placeholder="Search transactions"
        onSearch={(value) => handleSearch([value], () => {}, "search")}
        enterButton
        style={{ marginBottom: 20 }}
      />
      <Table
        columns={columns}
        dataSource={transactions}
        rowKey="id"
      />
    </div>
  );
};

export default TransactionHistory;
