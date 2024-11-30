import React from "react";
import Navbar from "../components/Navbar";
import Balance from "../components/Balance";
import Users from "../components/Users";

const Dashboard = () => {
  return (
    <div className="bg-white">
      <Navbar />
      <Balance balance={1000} />
      <Users />
    </div>
  );
};

export default Dashboard;
