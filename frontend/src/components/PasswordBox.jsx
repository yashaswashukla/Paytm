import { React, useState } from "react";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";

function PasswordBox({ label, placeholder, onChange, value }) {
  const [icon, setIcon] = useState(eyeOff);
  const [type, setType] = useState("password");
  const handleClick = () => {
    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
  };
  return (
    <div>
      <div className="text-sm font-bold text-black text-left py-2">{label}</div>
      <div className="flex">
        <input
          onChange={onChange}
          type={type}
          placeholder={placeholder}
          value={value}
          className="w-full px-2 py-1 border rounded border-slate-200 text-sm"
        />
        <div className="flex flex-cols justify-center items-center">
          <Icon
            className="absolute mr-10"
            icon={icon}
            size={18}
            onClick={handleClick}
          />
        </div>
      </div>
    </div>
  );
}

export default PasswordBox;
