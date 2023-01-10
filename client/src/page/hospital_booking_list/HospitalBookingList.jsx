import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ConfirmCheck from "../../component/check/ConfirmCheck";
import { getHospitalBookingInfoService } from "../../service/hospitalUserService";
import style from "./hospital_booking_list.module.css";
import EditIcon from "@mui/icons-material/Edit";
import EditHopitalBooking from "../../component/modal/EditHopitalBooking";
export default function HospitalBookingList() {
  const dispatch = useDispatch();
  const { hospitalBookingList } = useSelector((state) => state.hospitalUserReducer);
  useEffect(() => {
    getHospitalBookingInfoService(dispatch);
  }, []);
  // set up booking list need to confirm
  const bookingNeedToConfirm = () => {
    let bookingListToConfirm = [];
    hospitalBookingList?.map((item, index) => {
      // eslint-disable-next-line valid-typeof
      for (let i in item) {
        if (i === "booking_time") {
          for (let j in item[i]) {
            item[i][j].map((booking, index) => {
              if (booking.userConfirm) {
                let temp = { ...booking };
                temp.date = j;
                temp.hospitalName = item["hospitalName"];
                temp.bookingId = item["_id"];
                bookingListToConfirm.push(temp);
              }
            });
          }
        }
      }
    });
    return bookingListToConfirm;
  };
  const [modal, setModal] = useState({
    display: false,
    editInfo: {},
  });
  // render booking data
  const renderBookingNeedConfirm = () => {
    let listNeedToConfirm = bookingNeedToConfirm();
    return listNeedToConfirm?.map((item, index) => {
      return (
        <div className=" rounded-lg bg-gray-100  w-full flex justify-center items-center  md:flex-row my-10 p-5 shadow-2xl">
          <img
            src="https://www.statnews.com/wp-content/uploads/2022/03/AdobeStock_246942922.jpeg"
            className="block md:hidden lg:block rounded-md h-64 md:h-32 m-4 md:m-0 p-2 "
            alt=""
          />
          <div className="rounded px-4 w-4/5">
            <div className="flex gap-5">
              <span className="text-green-700 text-sm hidden md:block ">Time -{item["time"]}</span>
              <span className="text-green-700 text-sm hidden md:block">Date - {item["date"]}</span>
              <span className="text-red-700   flex-1 flex justify-end ">
                <button
                  className="hover:opacity-80 duration-100"
                  onClick={() => {
                    setModal({
                      display: true,
                      editInfo: item,
                    });
                  }}
                >
                  <EditIcon fontSize="large" className=" cursor-pointer" color="primary" deleteInfo={item}></EditIcon>
                </button>
              </span>
            </div>

            <div className="md:mt-0 text-gray-800 font-semibold text-xl mb-2">{item["hospitalName"]}</div>
            <div className="flex">
              <p className="p-2 pl-0 pt-1 text-sm text-gray-600">Cusomter Notes :{item["customerNote"]}</p>
            </div>
            <div className="flex">
              <p className="p-2 pl-0 pt-1 text-sm text-gray-600">Hospital Notes :{item["hospitalNote"]}</p>
            </div>
            <div className="flex flex-col gap-5 justify-center w-4/5 m-auto my-5">
              <ConfirmCheck details={"userConfirm"} cheked={item["userConfirm"]}></ConfirmCheck>
              <ConfirmCheck details={"hospitalConfirm"} cheked={item["hospitalConfirm"]}></ConfirmCheck>
              <ConfirmCheck details={"userVisitConfirm"} cheked={item["userVisitConfirm"]}></ConfirmCheck>
            </div>
          </div>
        </div>
      );
    });
  };
  return (
    <div className="flex flex-col w-4/5 mx-auto my-10 relative">
      <EditHopitalBooking modal={modal} setModal={setModal}></EditHopitalBooking>
      <h3 className="font-extrabold text-4xl text-green-800 text-center mb-10"> Hospital booking list</h3>

      {renderBookingNeedConfirm()}
    </div>
  );
}
