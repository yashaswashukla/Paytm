import React from "react";
import Navbar from "../components/Navbar";
import Balance from "../components/Balance";
import Users from "../components/Users";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [balance, setBalance] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();
  async function fetchData() {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/user/me", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (response.status === 403) {
        throw new Error(response.data.message);
      }
      setUserId(response.data.userId);
      setFirstName(response.data.firstName);
      setBalance(response.data.balance.toFixed(2));
    } catch (error) {
      navigate("/signin");
    }
  }
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="bg-white">
      <Navbar firstName={firstName} />
      <Balance balance={balance} />
      <Users userId={userId} fetchData={fetchData} />
    </div>
  );
};

export default Dashboard;
