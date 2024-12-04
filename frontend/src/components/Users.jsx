import React, { useEffect, useState } from "react";
import Button from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SendMoney from "../pages/SendMoney";
import SuccessPopup from "../components/SuccessPopup";
import FailurePopup from "../components/FailurePopup";

function Users({ userId, fetchData }) {
  const [currUser, setCurrUser] = useState([]);
  const [name, setName] = useState("");

  // Add debouncing

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/user/bulk?name=" + name, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((response) => {
        let data = response.data.user.filter((e) => {
          return e._id != userId;
        });
        setCurrUser(data);
      });
  }, [name, userId]);
  return (
    <div className="px-4 py-2">
      <div className="font-semibold text-lg">Users</div>
      <div className="my-2">
        <input
          onChange={(e) => {
            setName(e.target.value);
          }}
          type="text"
          placeholder="Search users..."
          className="w-full px-2 py-1 border rounded border-slate-200"
        />
      </div>
      <div>
        {currUser.map((e) => (
          <User
            firstName={e.firstName}
            lastName={e.lastName}
            _id={e._id}
            fetchData={fetchData}
          />
        ))}
      </div>
    </div>
  );
}

const User = ({ firstName, lastName, _id, fetchData }) => {
  const [trigger, setTrigger] = useState(0);
  const [success, setSuccess] = useState(0);
  const [failure, setFailure] = useState(0);

  return (
    <div className="flex justify-between">
      <div className="flex items-center">
        <div className="rounded-full bg-gray-200 h-10 w-10 flex justify-center mr-2">
          <div className="items-start flex flex-col justify-center h-full text-lg font-semibold">
            {firstName[0].toUpperCase()}
          </div>
        </div>
        <div className="flex flex-col justify-center h-full">
          <div>
            {firstName[0].toUpperCase() + firstName.slice(1)}{" "}
            {lastName[0].toUpperCase() + lastName.slice(1)}
          </div>
        </div>
      </div>
      <div>
        <Button
          onClick={() => {
            // navigate(
            //   "/send?id=" +
            //     _id +
            //     "&firstName=" +
            //     firstName +
            //     "&lastName=" +
            //     lastName
            // );
            setTrigger(1);
          }}
          label={"Send Money"}
        />
        <SendMoney
          trigger={trigger}
          setTrigger={setTrigger}
          firstName={firstName}
          lastName={lastName}
          id={_id}
          fetchData={fetchData}
          setSuccess={setSuccess}
          setFailure={setFailure}
        />
        <SuccessPopup trigger={success} set={setSuccess} />
        <FailurePopup trigger={failure} set={setFailure} />
      </div>
    </div>
  );
};

export default Users;
