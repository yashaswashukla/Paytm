import React from "react";

function InputBox({ label, placeholder, onChange }) {
  return (
    <div>
      <div className="text-sm font-bold text-black text-left py-2">{label}</div>
      <input
        onChange={onChange}
        type="text"
        placeholder={placeholder}
        className="w-full px-2 py-1 border rounded border-slate-200 text-sm"
      />
    </div>
  );
}

export default InputBox;