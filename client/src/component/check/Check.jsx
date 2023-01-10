import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import React from "react";

export default function Check({ time, userConfirm, setConfirmTime }) {
  let newTime;
  if (String(time).length === 4) {
    newTime = String(time);
  } else {
    newTime = 0 + String(time);
  }
  return (
    <ButtonGroup variant="contained" color="inherit" size="" aria-label="large button group" disabled={userConfirm}>
      <Button
        onClick={() => {
          setConfirmTime(time);
        }}
        sx={{ fontWeight: "bolder", fontSize: "1.4rem", color: "rgb(4, 26, 40);" }}
      >{`${newTime.substring(0, 2)} : ${newTime.substring(2, 4)}`}</Button>
    </ButtonGroup>
  );
}
