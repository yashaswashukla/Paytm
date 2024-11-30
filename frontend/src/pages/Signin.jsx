import React from "react";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";
const Signin = () => {
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="bg-white rounded-lg text-center py-2 px-5">
          <Heading label={"Sign In"} />
          <SubHeading label={"Enter your credentials to access your account"} />
          <InputBox label={"Email"} placeholder={"johndoe@gmail.com"} />
          <InputBox label={"Password"} placeholder={"*******"} />
          <Button label={"Sign In"} />
          <BottomWarning
            question={"Don't have an account?"}
            buttonText={"Sign Up"}
            to={"/signin"}
          />
        </div>
      </div>
    </div>
  );
};

export default Signin;
