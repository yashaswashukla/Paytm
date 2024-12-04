import React, { useState } from "react";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PasswordBox from "../components/PasswordBox";

const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [show, setShow] = useState(0);
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="bg-white rounded-lg text-center py-2 px-5">
          <Heading label={"Sign In"} />
          <SubHeading label={"Enter your credentials to access your account"} />
          {show !== 0 && (
            <div className="text-md text-red-500 font-medium">
              Incorrect Email/Password
            </div>
          )}
          <InputBox
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            label={"Email"}
            placeholder={"johndoe@gmail.com"}
          />
          <PasswordBox
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            label={"Password"}
            placeholder={"*******"}
          />
          <Button
            onClick={async () => {
              try {
                const response = await axios.post(
                  "http://localhost:3000/api/v1/user/signin",
                  {
                    username,
                    password,
                  }
                );
                if (response.status === 411) {
                  throw new Error(response.data.message);
                }
                localStorage.setItem("token", response.data.token);
                navigate("/dashboard");
              } catch (error) {
                setShow(1);
              }
            }}
            label={"Sign In"}
          />
          <BottomWarning
            question={"Don't have an account?"}
            buttonText={"Sign Up"}
            to={"/signup"}
          />
        </div>
      </div>
    </div>
  );
};

export default Signin;
