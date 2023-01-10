import { Switch } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import BtnBackMain from "../../component/button/BtnBackMain";
import BtnSubmit from "../../component/button/BtnSubmit";
import { handleLogin } from "../../service/userService";
import { HOSPITAL } from "../../util/role";

export default function Login() {
  // navigate
  const navigate = useNavigate();
  // dispatch
  const dispatch = useDispatch();
  // set up client/patient
  const [client, setClient] = useState({
    // fullname: "",
    nickname: "",
    role: "client",
    password: "",
  });
  // set up hospital
  const [hospital, setHospital] = useState({
    id: "",
    role: "hospital",
    password: "",
  });
  // check user login patient / hospital
  const [check, setChecked] = useState(false);
  // set up handle submit login
  const handleSubmit = () => {
    let userInfo;
    check ? (userInfo = hospital) : (userInfo = client);
    handleLogin(userInfo, dispatch, navigate);
  };
  return (
    <div className="h-screen md:flex">
      <div className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 i justify-around items-center hidden">
        <img src={require("./img/bg.jpg")} alt="" className="bg-cover h-full" />
      </div>
      <div className="flex md:w-1/2 justify-center py-10 items-center bg-white">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="bg-white"
        >
          <h1 className="text-gray-800 font-bold text-2xl mb-1">Hello Again!</h1>
          <p className="text-sm font-normal text-gray-600 mb-7">Welcome Back</p>
          {check ? (
            <>
              <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                  />
                </svg>
                <input
                  onChange={(e) => {
                    setHospital({
                      ...hospital,
                      id: e.target.value,
                    });
                  }}
                  className="pl-2 outline-none border-none"
                  type="number"
                  name
                  id
                  placeholder="Hospital ID"
                />
              </div>
              <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  onChange={(e) => {
                    setHospital({
                      ...hospital,
                      password: e.target.value,
                    });
                  }}
                  className="pl-2 outline-none border-none"
                  type="password"
                  name
                  id
                  placeholder="Password"
                />
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                  />
                </svg>
                <input
                  onChange={(e) => {
                    setClient({
                      ...client,
                      nickname: e.target.value,
                    });
                  }}
                  className="pl-2 outline-none border-none"
                  type="text"
                  name
                  id
                  placeholder="Nick Name"
                />
              </div>
              <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  onChange={(e) => {
                    setClient({
                      ...client,
                      password: e.target.value,
                    });
                  }}
                  className="pl-2 outline-none border-none"
                  type="password"
                  name
                  id
                  placeholder="Password"
                />
              </div>
            </>
          )}

          <BtnSubmit message={"Submit"} type="submit"></BtnSubmit>
          <div className="flex mt-5 justify-around w-full items-center flex-wrap ">
            <div className="flex items-center w-full justify-around flex-wrap ">
              <p className="">Login as {check ? HOSPITAL : "Patient"}</p>
              <div className="">
                <Switch
                  onChange={(e) => {
                    setClient({
                      ...client,
                      password: "",
                    });
                    setHospital({
                      ...hospital,
                      password: "",
                    });
                    setChecked(e.target.checked);
                  }}
                />
              </div>
            </div>
            <span
              className="text-sm ml-2  hover:text-blue-500 cursor-pointer"
              onClick={() => {
                navigate("/register");
              }}
            >
              dont have account ? ?
            </span>
            <BtnBackMain></BtnBackMain>
          </div>
        </form>
      </div>
    </div>
  );
}
