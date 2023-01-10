import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { openLoadingService } from "../../service/loadingService";
import { checkToken } from "../../service/tokenService";
import { handleBookingService } from "../../service/userService";

export default function BookingConfirm(props) {
  const { hospitalName, bookingTime, hospitalId, bookingDate } = props;
  // navigate
  const navigate = useNavigate();
  // dispatch
  const dispatch = useDispatch();
  let newTime;
  if (String(bookingTime).length === 4) {
    newTime = String(bookingTime);
  } else {
    newTime = 0 + String(bookingTime);
  }
  const [booking, setBooking] = useState({
    hospitalId: "",
    bookingDate: "",
    bookingTime: "",
    customerNote: "",
  });
  useEffect(() => {
    setBooking({
      ...booking,
      hospitalId: hospitalId,
      bookingDate: bookingDate,
      bookingTime: bookingTime,
    });
  }, [props]);
  const handleBooking = (dispatch, navigate) => {
    if (!checkToken()) {
      alert("please login to book ");
      return navigate("/login");
    }
    if (!bookingDate || bookingTime === undefined) {
      return alert("please select date  and time ");
    }
    return handleBookingService(dispatch, booking, navigate);
  };
  return (
    <div className="flex flex-col items-center mb-16">
      <h2 className="font-extrabold text-3xl text-green-800 text-center my-10 "> your booking time</h2>
      <div className="rounded-2xl border border-blue-100 p-8 shadow-lg w-1/3" role="alert">
        <div className="items-center">
          <p className="mt-3 text-lg font-medium sm:mt-0 sm:ml-3">{hospitalName}</p>
        </div>
        <p className="mt-4 text-gray-800 text-center">
          Date : <span className="text-rose-100 text-3xl"> {bookingDate}</span>
        </p>
        <p className="mt-4 text-gray-800 text-center">
          Booking time :<span className="text-rose-100 text-3xl">{`${newTime.substring(0, 2)}:${newTime.substring(2, 4)}`}</span>
        </p>

        <form action="" className="flex flex-col">
          <label htmlFor="customerNote">customer note :</label>
          <textarea
            name="customerNote"
            id="customerNote"
            cols="auto"
            rows="5"
            onChange={(e) => {
              setBooking({
                ...booking,
                customerNote: e.target.value,
              });
            }}
          ></textarea>
        </form>
        <div className="mt-6 sm:flex justify-center">
          <button
            className="inline-block w-full rounded-lg bg-blue-500 px-5 py-3 text-center text-sm font-semibold text-white sm:w-auto animate-bounce"
            onClick={() => {
              handleBooking(dispatch, navigate);
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
