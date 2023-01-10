import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
export default function BtnBackMain() {
  const navigate = useNavigate();
  return (
    <button
      className="text-green-700  hover:text-green-900 cursor-pointer "
      onClick={() => {
        navigate("/");
      }}
    >
      <HomeIcon fontSize="large" className="shadow-2xl"></HomeIcon>
    </button>
  );
}
