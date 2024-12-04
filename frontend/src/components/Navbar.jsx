import React from "react";

function Navbar({ firstName }) {
  return (
    <div className="flex justify-between py-2 px-4 shadow">
      <div className="flex flex-col justify-center text-2xl font-semibold">
        PayTM App
      </div>
      <div className="flex">
        <div className="flex flex-col justify-center mr-2 text-lg font-semibold">
          Hello
        </div>
        <div className="rounded-full bg-gray-200 h-10 w-10 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-lg font-semibold">
            {firstName.toUpperCase()[0]}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
