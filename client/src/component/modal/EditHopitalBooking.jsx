import { Checkbox } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { editHospitalBooking } from "../../service/hospitalUserService";

export default function EditHopitalBooking({ modal, setModal }) {
  const dispatch = useDispatch();
  const { display, editInfo } = modal;
  const { hospitalName, date, time, customerId } = editInfo;
  let changeKey = ["hospitalConfirm", "userVisitConfirm", "hospitalNote"];
  const renderEdit = () => {
    let render = [];
    for (let i in editInfo) {
      if (changeKey.includes(i)) {
        if (i !== "hospitalNote") {
          render.push(
            <div className="flex w-full justify-between">
              <label className="">{i} </label>
              <Checkbox
                defaultChecked={editInfo[i]}
                onChange={(e) => {
                  console.log(e.target.checked);
                  let temp = { ...editInfo };
                  temp[i] = e.target.checked;
                  setModal({
                    ...modal,
                    editInfo: temp,
                  });
                }}
              />
            </div>
          );
        } else {
          render.push(
            <div className="flex w-full justify-between items-center">
              <label className="">{i} </label>
              <textarea
                defaultValue={`${editInfo[i]}`}
                onChange={(e) => {
                  let temp = { ...editInfo };
                  temp[i] = e.target.value;
                  setModal({
                    ...modal,
                    editInfo: temp,
                  });
                }}
                className="mt-4 text-gray-500 border-gray-300 border-2  w-3/4"
              />
            </div>
          );
        }
      }
    }
    return render;
  };
  return display ? (
    <div>
      <div className="absolute flex justify-center h-screen backdrop-blur-md items-center w-full z-50 space-y-5 mt-5  ">
        <div className="rounded-2xl border w-3/4 border-blue-100 bg-white p-8 shadow-lg h-fit" role="alert">
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
            <div>
              <p className="mt-3 text-lg font-medium sm:mt-0 sm:ml-3">{hospitalName} </p>
              <span className="text-green-700 text-sm hidden md:block ">Time : {time}</span>
              <span className="text-green-700 text-sm hidden md:block"> Date : {date}</span>
              <span className="text-green-700 text-sm hidden md:block"> CustomerId : {customerId}</span>
            </div>
          </div>
          <form action="" className="mt-5 flex flex-col gap-4">
            {renderEdit()}
          </form>

          <div className="mt-6 sm:flex capitalize">
            <button
              onClick={() => {
                console.log(editInfo);
                editHospitalBooking(dispatch, editInfo);
              }}
              className="inline-block w-96 rounded-lg bg-blue-500 px-5 py-3 text-center text-sm font-semibold text-white sm:w-auto "
            >
              confirm
            </button>
            <button
              className="mt-3 inline-block w-52 rounded-lg bg-gray-200  px-5 py-3 text-center text-sm font-semibold text-gray-500 sm:mt-0 sm:ml-3 sm:w-auto"
              onClick={() => {
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
    </div>
  ) : (
    ""
  );
}
