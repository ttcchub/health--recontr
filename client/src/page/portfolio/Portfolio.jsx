import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BtnSubmit from "../../component/button/BtnSubmit";
import BtnSuccess from "../../component/button/BtnSuccess";
import { closeLoadingService, openLoadingService } from "../../service/loadingService";
import { handleGetUserProfile } from "../../service/userService";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { checkToken } from "../../service/tokenService";
import { useNavigate } from "react-router-dom";
import { el } from "date-fns/locale";

export default function Portfolio() {
  // navigate
  const navigate = useNavigate();
  // dispatch
  const dispatch = useDispatch();
  // get user profile
  useEffect(() => {
    handleGetUserProfile(dispatch);
  }, []);
  const { userProfile } = useSelector((state) => state.userReducer);
  useEffect(() => {
    setMainUserProfile(userProfile);
  }, [userProfile]);
  // get user profile
  // set temp state for user profile
  const [mainUserProfile, setMainUserProfile] = useState();
  // allow edit
  const [allowEdit, setAllowEdit] = useState(false);

  // handleEdit
  const handleEdit = (i, allowEdit) => {
    if (allowEdit) {
      switch (i) {
        case "_id":
          return true;
        case "role":
          return true;
        default:
          return false;
      }
    } else {
      return true;
    }
  };
  const renderProfile = () => {
    let render = [];
    for (let i in mainUserProfile) {
      if (i !== "bookingList" && i !== "__v") {
        render.push(
          <div key={i} className="flex gap-5 my-3 justify-around ">
            <label htmlFor="" className="md:mt-0 text-gray-800 w-1/5 font-semibold text-xl mb-2 flex items-center">
              {i}
            </label>
            <input
              onChange={(e) => {
                let temp = { ...mainUserProfile };
                temp[`${i}`] = e.target.value;
                setMainUserProfile({ ...temp });
              }}
              disabled={handleEdit(i, allowEdit)}
              defaultValue={`${mainUserProfile[i]}`}
              type={`${i === seePwd ? seePwd : ""}`}
              className={`rounded-md text-xl text-gray-600 w-3/5 border-2 p-3  border-gray-400 ${
                handleEdit(i, allowEdit) ? "bg-gray-300" : "bg-gray-50"
              } `}
            />
          </div>
        );
      }
    }
    return render;
  };
  // see pwd
  const [seePwd, setSeePwd] = useState("password");
  if (checkToken()) {
    return (
      <div className="w-4/5 mx-auto">
        <div className="rounded-lg bg-gray-100  w-full flex justify-center items-center  md:flex-row my-10 p-5 shadow-2xl">
          <form
            className="rounded px-4 w-4/5"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            {renderProfile()}

            <div className="flex gap-5 justify-center w-4/5 m-auto my-5">
              <BtnSubmit message={"Save Changed"} mainUserProfile={mainUserProfile}></BtnSubmit>
              <BtnSuccess message={"Edit"} setAllowEdit={setAllowEdit} allowEdit={allowEdit}></BtnSuccess>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(e) => {
                      e.target.checked ? setSeePwd("text") : setSeePwd("password");
                    }}
                    name="jason"
                  />
                }
                label="See Password"
              />
            </div>
          </form>
        </div>
      </div>
    );
  } else {
    navigate("/login");
  }
}
