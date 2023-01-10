import { Avatar } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link,  } from "react-router-dom";
import { handleLogOut } from "../../service/userService";

export default function UserAvatar() {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  return (
    <div
      className="relative"
      onClick={() => {
        setShow(!show);
      }}
    >
      <Avatar alt="Remy Sharp" src="https://i.pravatar.cc/300" />
      {show && (
        <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1" role="none">
            <Link to={"user/portfolio"} className="text-gray-700 block px-4 py-2 hover:bg-gray-500  duration-75 text-sm" role="menuitem">
              Account settings
            </Link>
            <Link to={"user/userbooking"} className="text-gray-700 hover:bg-gray-500 duration-75 block px-4 py-2  text-sm" role="menuitem">
              Booking list
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
