import React, { useState } from "react";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PasswordBox from "../components/PasswordBox";
const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(0);
  const [wrongInput, setWrongInput] = useState("");
  const navigate = useNavigate();
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="bg-white rounded-lg text-center py-2 px-5">
          <Heading label={"Sign Up"} />
          <SubHeading label={"Enter your information to create an account"} />
          {show !== 0 && (
            <div className="text-md text-red-500 font-medium">{wrongInput}</div>
          )}
          <InputBox
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            label={"First Name"}
            placeholder={"John"}
          />
          <InputBox
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            label={"Last Name"}
            placeholder={"Doe"}
          />
          <InputBox
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            label={"Email"}
            placeholder={"johndoe@gmail.com"}
          />
          <PasswordBox
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            label={"Password"}
            placeholder={"*******"}
          />
          <Button
            label={"Sign Up"}
            onClick={async () => {
              try {
                const response = await axios.post(
                  "http://localhost:3000/api/v1/user/signup",
                  {
                    username,
                    password,
                    firstName,
                    lastName,
                  }
                );
                if (response.status === 411) {
                  throw new Error(response);
                }
                navigate("/dashboard");
                localStorage.setItem("token", response.data.token);
                // localStorage.removeItem("token"); to
              } catch (error) {
                setWrongInput(error.response.data.message);
                // console.log(error.response.data.message);
                setShow(1);
              }
            }}
          />
          <BottomWarning
            question={"Already have an account?"}
            buttonText={"Sign in"}
            to={"/signin"}
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
