import React from "react";

function Navbar() {
  return (
    <div className="flex justify-between py-2 px-4 shadow">
      <div className="flex flex-col justify-center text-2xl font-semibold">
        PayTM App
      </div>
      <div className="flex">
        <div className="flex flex-col justify-center mr-2">Hello</div>
        <div className="rounded-full bg-gray-200 h-10 w-10 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">U</div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
