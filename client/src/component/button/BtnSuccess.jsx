import React from "react";

export default function BtnSuccess({ message, setAllowEdit, allowEdit }) {
  return (
    <button
      onClick={() => {
        setAllowEdit(!allowEdit);
      }}
      className="block w-full bg-green-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
    >
      {message}
    </button>
  );
}
