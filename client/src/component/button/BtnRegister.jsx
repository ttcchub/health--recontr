import React from "react";
import Button from "@mui/material/Button";
import LoginIcon from "@mui/icons-material/Login";
import { Link } from "react-router-dom";

export default function BtnRegister() {
  return (
    <Button variant="contained" color="warning">
      <Link to={"register"}>
        Register <LoginIcon fontSize="large"></LoginIcon>
      </Link>
    </Button>
  );
}
