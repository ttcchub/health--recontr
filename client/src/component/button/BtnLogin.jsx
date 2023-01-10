import React from "react";
import Button from "@mui/material/Button";
import LoginIcon from "@mui/icons-material/Login";
import { Link } from "react-router-dom";

export default function BtnLogin() {
  return (
    <Button variant="contained" color="success">
      <Link to="login">
        login <LoginIcon fontSize="large"></LoginIcon>
      </Link>
    </Button>
  );
}
