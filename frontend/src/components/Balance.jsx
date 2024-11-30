import React from "react";

function Balance({ balance }) {
  return (
    <div className="flex p-4">
      <div className="flex flex-col justify-center h-full text-xl font-semibold mr-2">
        Your Balance:{" "}
      </div>
      <div className="flex flex-col justify-center h-full text-xl font-semibold">
        {balance}
      </div>
    </div>
  );
}

export default Balance;
