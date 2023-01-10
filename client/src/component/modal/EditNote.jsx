import React from "react";
import { useDispatch } from "react-redux";
import { handleEditBookingNote } from "../../service/userService";

export default function EditNote({ modal, setModal }) {
  const dispatch = useDispatch();
  const { display, editInfo } = modal;
  return display ? (
    <div className="absolute h-screen flex items-center backdrop-blur-md   justify-center w-full z-50 space-y-5 mt-5  ">
      <div className="rounded-2xl border w-3/4 border-blue-100 bg-white p-8 shadow-lg " role="alert">
        <div className="items-center sm:flex">
          <span className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-400 text-white animate-ping">
            <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path
                clipRule="evenodd"
                d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z"
                fillRule="evenodd"
              />
            </svg>
          </span>
          <p className="mt-3 text-lg font-medium sm:mt-0 sm:ml-3">Edit Note </p>
        </div>
        <textarea
          defaultValue={`${editInfo["customerNote"]}`}
          onChange={(e) => {
            let temp = { ...editInfo };
            temp.customerNote = e.target.value;
            setModal({
              ...modal,
              editInfo: temp,
            });
          }}
          className="mt-4 text-gray-500 border-gray-300 border-2  w-full"
        />

        <div className="mt-6 sm:flex capitalize">
          <button
            onClick={() => {
              handleEditBookingNote(dispatch, modal.editInfo);
              setModal({
                ...modal,
                display: false,
              });
            }}
            className="inline-block w-96 rounded-lg bg-blue-500 px-5 py-3 text-center text-sm font-semibold text-white sm:w-auto "
          >
            confirm
          </button>
          <button
            className="mt-3 inline-block w-52 rounded-lg bg-gray-200  px-5 py-3 text-center text-sm font-semibold text-gray-500 sm:mt-0 sm:ml-3 sm:w-auto"
            onClick={() => {
              //   dispatch(close_modal());
              setModal({
                ...modal,
                display: false,
              });
            }}
          >
            close
          </button>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}

