import React, { useState } from "react";
import BtnBackMain from "../../component/button/BtnBackMain";
import BtnSubmit from "../../component/button/BtnSubmit";
import Switch from "@mui/material/Switch";
import { CLIENT, HOSPITAL } from "../../util/role";
import { handleRegister } from "../../service/userService";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { emailRegex, pwdRegex } from "../../util/regex";

export default function Register() {
  // set dispatch
  const dispatch = useDispatch();
  // navigate
  const navigate = useNavigate();
  // set up form hospital/client login
  const [checked, setChecked] = useState(false);
  // set up data patient
  const [client, setClient] = useState({
    fullname: "",
    nickname: "",
    role: "client",
    password: "",
    email: "",
  });
  // set up data for hospital
  const [hospital, setHospital] = useState({
    id: "",
    role: "hospital",
    password: "",
  });
  // set up password checked
  const [pwdSame, setUpPwdSame] = useState(false);
  const handleCheckPwd = (pwd, confirmPwd) => {
    pwd === confirmPwd ? setUpPwdSame(true) : setUpPwdSame(false);
  };
  // check email correct form
  const [emailCheck, setEmailCheck] = useState(false);
  const handleEmailCheck = (email) => {
    return setEmailCheck(emailRegex.test(email));
  };
  // check pwd correct form
  const [pwdCheck, setPwdCheck] = useState(false);
  const handlePwdCheck = (pwd) => {
    return setPwdCheck(pwdRegex.test(pwd));
  };
  // handle submit
  const handeSubmit = () => {
    let userInfor;
    checked ? (userInfor = hospital) : (userInfor = client);
    handleRegister(userInfor, dispatch, navigate);
  };

  return (
    <div className="h-screen md:flex">
      <div className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 i justify-around items-center hidden">
        <img src={require("./img/bg.jpg")} alt="" className="bg-cover h-full" />
      </div>
      <div className="flex md:w-1/2 justify-center items-center bg-white relative">
        {/* form */}
        <form
          className="bg-white w-4/5 mx-auto"
          onSubmit={(e) => {
            e.preventDefault();
            if (!pwdSame) {
              return alert("make sure password confirm is corrected");
            }
            if (!emailCheck && !checked) {
              return alert(
                "email should be The domain name [for example com, org, net, in, us, info] part contains letters, digits, hyphens, and dots."
              );
            }
            if (!pwdCheck) {
              return alert("password between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter");
            }
            handeSubmit();
          }}
        >
          <div className="">
            <h1 className="text-gray-800 font-bold text-2xl mb-1 ">register !</h1>
            <p className="text-sm font-normal text-gray-600 mb-7">Welcome new {checked ? "hospital" : "customer"}</p>
          </div>
          {/* render input */}
          {checked ? (
            <>
              <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                <input
                  className="pl-2 outline-none border-none"
                  type="number"
                  value={hospital.id}
                  onChange={(e) => {
                    setHospital({
                      ...hospital,
                      id: e.target.value,
                    });
                  }}
                  name
                  id
                  placeholder="Hospital ID"
                  required
                />
              </div>
              <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  value={hospital.password}
                  onChange={(e) => {
                    handlePwdCheck(e.target.value);
                    setHospital({
                      ...hospital,
                      password: e.target.value,
                    });
                  }}
                  className="pl-2 outline-none border-none w-full"
                  type="Password"
                  name
                  id
                  placeholder="Password"
                  required
                  min={4}
                />
              </div>
              <div className="flex items-center  w-full m-auto">
                <p className={`${pwdCheck ? "text-green-500" : "text-red-500"}`}>
                  {pwdCheck
                    ? "correct pwd"
                    : "password between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter"}
                </p>
              </div>
              <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  onChange={(e) => {
                    handleCheckPwd(hospital.password, e.target.value);
                  }}
                  className="pl-2 outline-none border-none"
                  minLength={4}
                  type="Password"
                  name
                  id
                  placeholder="Confirm Password"
                  required
                />
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                <input
                  onChange={(e) => {
                    setClient({
                      ...client,
                      fullname: e.target.value,
                    });
                  }}
                  value={client.fullname}
                  className="pl-2 outline-none border-none"
                  type="text"
                  name
                  id
                  placeholder="Full Name"
                  required
                />
              </div>
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
                  value={client.nickname}
                  className="pl-2 outline-none border-none"
                  type="text"
                  name
                  id
                  placeholder="Nick Name"
                  required
                />
              </div>
              <div className="flex items-center border-2 py-2 px-3 rounded-2xl  mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
                <input
                  onChange={(e) => {
                    handleEmailCheck(e.target.value);
                    setClient({
                      ...client,
                      email: e.target.value,
                    });
                  }}
                  value={client.email}
                  className="pl-2 outline-none border-none w-full"
                  type="text"
                  name
                  id
                  placeholder="Email Address"
                  required
                />
              </div>
              <div className={`${emailCheck ? "text-green-500" : "text-red-500"} w-full m-auto`}>{emailCheck ? "correct email" : "wrong email"}</div>

              <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  onChange={(e) => {
                    handlePwdCheck(e.target.value);
                    setClient({
                      ...client,
                      password: e.target.value,
                    });
                  }}
                  value={client.password}
                  className="pl-2 outline-none border-none w-full"
                  type="Password"
                  name
                  id
                  placeholder="Password"
                  required
                  min={4}
                />
              </div>
              <div className="flex items-center  w-full m-auto">
                <p className={`${pwdCheck ? "text-green-500" : "text-red-500"}`}>
                  {pwdCheck
                    ? "correct pwd"
                    : "password between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter"}
                </p>
              </div>
              <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  min={4}
                  onChange={(e) => {
                    handleCheckPwd(client.password, e.target.value);
                  }}
                  className="pl-2 outline-none border-none"
                  type="Password"
                  name
                  id
                  placeholder="Confirm Password"
                  required
                />
              </div>
            </>
          )}
          {/* form change */}
          <div className="">
            <div className="flex items-center w-full justify-center flex-wrap ">
              <p className="">Resister as {checked ? HOSPITAL : "Patient"}</p>
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
                    setPwdCheck(false);
                    setChecked(e.target.checked);
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col justify-center w-full ">
              <BtnSubmit message={"Submit"}></BtnSubmit>
              <BtnBackMain></BtnBackMain>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
