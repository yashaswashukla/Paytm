import React, { useState } from "react";
import axios from "axios";

const SendMoney = ({
  trigger,
  setTrigger,
  firstName,
  lastName,
  id,
  fetchData,
  setSuccess,
  setFailure,
}) => {
  const [amount, setAmount] = useState(0);

  const transfer = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/account/transfer",
        {
          to: id,
          amount,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (response.status === 400) {
        throw new Error(response.data.message);
      }
      setSuccess(1);
      await fetchData();
    } catch (error) {
      setFailure(1);
    }
  };

  return trigger ? (
    <div className="fixed top-0 left-0 w-full h-screen bg-black/60 flex justify-center items-center">
      <div className="relative">
        <div className="flex flex-col align-center">
          <div className="w-80 py-5 px-8 bg-white rounded-lg ">
            <div className="text-3xl font-bold text-center">Send Money</div>
            <div className="mt-10 flex gap-x-2 mb-2">
              <div className="rounded-full h-10 w-10 bg-green-500 flex justify-center">
                <div className="flex flex-col justify-center h-full text-white font-bold">
                  {firstName[0].toUpperCase()}
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <div className="text-xl font-semibold">
                  {firstName + " " + lastName}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-y-2 mt-3">
              <div className="text-md font-semibold">Amount (in Rs)</div>
              <input
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
                type="text"
                placeholder="Enter Amount"
                className="rounded-md py-1 px-1.5 bg-white text-sm border border-slate-200 text-slate-500"
              />
            </div>
            <button
              onClick={async () => {
                await transfer();
                setTrigger(0);
              }}
              className="bg-green-500 w-full mt-3 rounded-md text-md font-semibold text-white py-1.5 hover:bg-green-600"
            >
              {" "}
              Initiate Transaction
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default SendMoney;
