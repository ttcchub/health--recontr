import { CircularProgress } from "@mui/material";
import React from "react";

export default function Loading() {
  return (
    <div className="flex fixed z-50 w-screen opacity-70 h-screen justify-center items-center	  bg-black ">
      <CircularProgress />
    </div>
  );
}
