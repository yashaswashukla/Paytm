import React from "react";

const SendMoney = () => {
  return (
    <div className="bg-slate-300 h-screen flex items-center justify-center">
      <div className="flex flex-col align-center">
        <div className="w-80 p-4 bg-white rounded-lg ">
          <div className="text-3xl font-semibold text-center">Send Money</div>
          <div className="mt-4 flex gap-x-2 mb-2">
            <div className="rounded-full h-8 w-8 bg-green-500 flex justify-center">
              <div className="flex flex-col justify-center h-full text-white">
                A
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <div className="text-md font-semibold">Friend's Name</div>
            </div>
          </div>
          <div className="flex flex-col gap-y-2">
            <div className="text-xs font-semibold">Amount (in Rs)</div>
            <input
              type="text"
              placeholder="Enter Amount"
              className="rounded-md py-1 px-1.5 bg-white text-xs border border-slate-200 text-slate-500"
            />
          </div>
          <button className="bg-green-500 w-full mt-2 rounded-md text-sm font-semibold text-white py-1 hover:bg-green-600">
            {" "}
            Initiate Transaction
          </button>
        </div>
      </div>
    </div>
  );
};

export default SendMoney;
