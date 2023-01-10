import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { close_modal } from "../../redux/reducer/modalReducer";

export default function BtnBook(props) {
  const { id, message } = props;
  const dispatch = useDispatch();

  return (
    <button
      className="inline-block w-full rounded-lg bg-blue-500 px-5 py-3 text-center text-sm font-semibold text-white sm:w-auto animate-bounce"
      onClick={() => {
        dispatch(close_modal());
      }}
    >
      <Link to={`${id}`}>{message}</Link>
    </button>
  );
}
