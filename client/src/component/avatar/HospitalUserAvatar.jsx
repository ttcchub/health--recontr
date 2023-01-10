import { Avatar } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { handleLogOut } from "../../service/userService";

export default function HospitalUserAvatar() {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  return (
    <div
      className="relative"
      onClick={() => {
        setShow(!show);
      }}
    >
      <Avatar alt="hospital_logo" src={require("./img/hospital_logo.jpeg")} />
      {show && (
        <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1" role="none">
            <Link to={"campus/booking_list"} className="text-gray-700 block hover:bg-gray-500 px-4 py-2 duration-75 text-sm" role="menuitem">
              Booking request from customer
            </Link>
            <Link
              onClick={() => {
                handleLogOut(dispatch);
              }}
              className="text-gray-700 block hover:bg-gray-500 px-4 py-2 duration-75 text-sm"
              role="menuitem"
            >
              logout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
