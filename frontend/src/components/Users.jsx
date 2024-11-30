import React, { useState } from "react";
import Button from "./Button";

const User = ({ firstName, lastName }) => {
  return (
    <div className="flex justify-between">
      <div className="flex items-center">
        <div className="rounded-full bg-gray-200 h-10 w-10 flex justify-center mr-2">
          <div className="flex flex-col justify-center h-full text-xl">
            {firstName[0]}
          </div>
        </div>
        <div className="flex flex-col justify-center h-full">
          <div>
            {firstName} {lastName}
          </div>
        </div>
      </div>
      <div>
        <Button label={"Send Money"} />
      </div>
    </div>
  );
};

function Users() {
  const [currUser, setCurrUser] = useState([
    {
      firstName: "Yashaswa",
      lastName: "Shukla",
      _id: 1,
    },
  ]);
  return (
    <div className="px-4 py-2">
      <div className="font-semibold text-lg">Users</div>
      <div className="my-2">
        <input
          type="text"
          placeholder="Search users..."
          className="w-full px-2 py-1 border rounded border-slate-200"
        />
      </div>
      <div>
        {currUser.map((e) => (
          <User firstName={e.firstName} lastName={e.lastName} />
        ))}
      </div>
    </div>
  );
}

export default Users;
