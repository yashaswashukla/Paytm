import React from "react";

function Button({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="my-3 px-3 py-1.5 rounded-lg bg-gray-800 text-center w-full text-white hover:bg-gray-700"
    >
      {label}
    </button>
  );
}

export default Button;
