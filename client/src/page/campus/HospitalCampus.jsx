import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HospitalDetail from "../../component/modal/HospitalDetail";
import { getHospitalUserInfoService } from "../../service/hospitalUserService";
import style from "./hospitalCampus.module.css";

export default function HospitalCampus() {
  const { hospitalUserInfor } = useSelector((state) => state.hospitalUserReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    getHospitalUserInfoService(dispatch);
  }, []);
  const [modal, setModal] = useState(false);
  const [detail, setDetail] = useState();
  const renderHospitalList = () => {
    return hospitalUserInfor?.map((item, index) => {
      return (
        <div
          key={index}
          className="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 max-w-xs md:max-w-3xl mx-auto border border-white bg-gray-50"
        >
          <div className="w-full md:w-1/3 bg-gray-50 grid place-items-center">
            <img
              src={`https://cdn.systematic.com/media/g0sj1tbg/hospital-building-001-global.jpg?mode=crop&width=1200&height=630&center=`}
              alt="tailwind logo"
              className="rounded-xl"
            />
          </div>
          <div className="w-full md:w-2/3 bg-gray-50 flex flex-col space-y-2 p-3">
            <div className="flex justify-between item-center">
              <p className="text-gray-500 font-semibold hidden md:block">{item.hospitalName}</p>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <p className="text-gray-600 font-bold text-sm ml-1">
                  4.96
                  <span className="text-gray-500 font-normal">(76 reviews)</span>
                </p>
              </div>

              <div className="bg-gray-200 p-2 flex flex-col rounded-full justify-center   text-xs font-medium text-gray-800  md:block">
                {item.location}
              </div>
            </div>
            <h3 className="font-black text-gray-800 md:text-3xl text-xl">Service</h3>
            <p className="md:text-2xl text-gray-400 text-base">{item.service}, ...</p>
            <div className="flex justify-center pt-5">
              <button
                className="bg-gray-200 px-3 py-1 w-fit capitalize rounded-full text-xs font-medium text-gray-800 hidden md:block hover:shadow-lg delay-75 duration-150"
                onClick={() => {
                  setModal(true);
                  setDetail(item);
                }}
              >
                check hospital details
              </button>
            </div>
          </div>
        </div>
      );
    });
  };
  return (
    <div className="flex flex-col justify-center py-5 gap-5 bg-gray-100">
      <HospitalDetail modal={modal} setModal={setModal} detail={detail}></HospitalDetail>

      {renderHospitalList()}
    </div>
  );
}
