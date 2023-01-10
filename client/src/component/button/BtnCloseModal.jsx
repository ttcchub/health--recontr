import React from "react";

export default function BtnCloseModal(props) {
  return (
    <button
      onClick={() => {
        props.setModal(false);
      }}
      className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
    >
      {props?.message}
    </button>
  );
}
