import React from "react";

function SuccessPopup(props) {
  return props.trigger ? (
    <div className="fixed top-0 left-0 w-full h-screen bg-black/40 flex justify-center items-center">
      <div className="relative px-20 py-10 rounded-lg bg-white">
        <div className="flex flex-col justify-center">
          <div className="text-3xl font-bold text-green-500">
            Transfer Successful
          </div>
          <button
            className="mt-10 px-2 py-1 bg-slate-500 rounded-lg text-white hover:bg-slate-600"
            onClick={() => {
              props.set(0);
            }}
          >
            Go back
          </button>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}

export default SuccessPopup;
