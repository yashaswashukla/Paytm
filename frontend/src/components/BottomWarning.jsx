import React from "react";
import { Link } from "react-router-dom";

function BottomWarning({ question, buttonText, to }) {
  return (
    <div className="flex justify-center pb-2">
      <p className="text-center text-sm font-bold text-black">{question}</p>
      <Link className="ml-1 text-sm font-bold text-black underline" to={to}>
        {" "}
        {buttonText}{" "}
      </Link>
    </div>
  );
}

export default BottomWarning;
