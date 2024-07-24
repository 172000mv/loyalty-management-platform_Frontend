// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CustomLayout from "./components/Layout";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./pages/Dashboard";
import TransactionHistory from "./pages/TransactionHistory";
import PointsOperation from "./pages/PointsOperation";
import PrivateRoute from "./utils/PrivateRoute";
import MemberOperation from './pages/MemberOperation';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <CustomLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="transaction-form/points-operation" element={<PointsOperation />} />
          <Route path="transaction-form/member-operation" element={<MemberOperation />} />
          <Route path="transaction-history" element={<TransactionHistory />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
