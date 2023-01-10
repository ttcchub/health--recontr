import React from "react";
import { useDispatch } from "react-redux";
import { handleEditProfile } from "../../service/userService";

export default function BtnSubmit(props) {
  const dispatch = useDispatch();
  return (
    <button
      onClick={() => {
        if (props.mainUserProfile) {
          const { fullname, nickname, role, password, email } = props.mainUserProfile;
          let userInfo = {};
          Object.assign(userInfo, {
            fullname,
            nickname,
            role,
            password,
            email,
          });
          handleEditProfile(dispatch, userInfo);
        }
      }}
      className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
    >
      {props?.message}
    </button>
  );
}
