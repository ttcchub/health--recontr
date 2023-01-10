import React from "react";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import YouTubeIcon from "@mui/icons-material/YouTube";
import GoogleIcon from "@mui/icons-material/Google";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import style from "./css/header.module.css";
import { Link, NavLink } from "react-router-dom";
import UserAvatar from "../component/avatar/UserAvatar";
import BtnLogin from "../component/button/BtnLogin";
import BtnRegister from "../component/button/BtnRegister";
import { checkRole, checkToken } from "../service/tokenService";
import { CLIENT, HOSPITAL } from "../util/role";
import { el } from "date-fns/locale";
import HospitalUserAvatar from "../component/avatar/HospitalUserAvatar";
import logo from "../Logo/logo.png";
const navItems = ["/", "post", "hospital", "shop", "campus"];

export default function Header(props) {
  return (
    <div className="flex flex-col w-full ">
      {/* header top  */}
      <div className="flex bg-teal-600 justify-around w-full text-3xl  py-5">
        {/* header top left  */}
        <div className=" flex text-teal-50">
          <div className="space-x-2">
            <MarkEmailReadIcon></MarkEmailReadIcon>
            <span>Email.com</span>
          </div>
          <div>
            <LocationOnIcon></LocationOnIcon>
            <span>location</span>
          </div>
        </div>
        {/* header top right */}
        <div className=" flex text-4xl text-teal-50 space-x-2">
          <FacebookOutlinedIcon fontSize="large"></FacebookOutlinedIcon>
          <YouTubeIcon fontSize="large"></YouTubeIcon>
          <GoogleIcon fontSize="large"></GoogleIcon>
          <LinkedInIcon fontSize="large"></LinkedInIcon>
          {checkRole() === CLIENT ? <UserAvatar /> : ""}
          {checkRole() === HOSPITAL ? <HospitalUserAvatar /> : ""}
          {!checkToken() ? <BtnLogin></BtnLogin> : ""}
          {!checkToken() ? <BtnRegister></BtnRegister> : ""}
        </div>
      </div>
      {/* header bottom */}
      <nav className={[style.header_bottom].join(" ")}>
        {/* logo rigth */}
        <div className="flex justify-center items-center">
          <Link to="/">
            <img src={logo} alt="logo" style={{ width: "100px", height: "100px" }} />
          </Link>
        </div>

        {/* left */}
        <div className="flex gap-5 items-center">
          {navItems.map((item, index) => {
            if (checkRole() !== HOSPITAL && item !== "campus") {
              return (
                <NavLink key={index} to={`${item}`}>
                  <button className={style["nav"]}>{item === "/" ? "home" : item}</button>
                </NavLink>
              );
            } else if (checkRole() === HOSPITAL && item !== "hospital") {
              return (
                <NavLink key={index} to={`${item}`}>
                  <button className={style["nav"]}>{item === "/" ? "home" : item}</button>
                </NavLink>
              );
            }
          })}
        </div>
      </nav>
    </div>
  );
}
