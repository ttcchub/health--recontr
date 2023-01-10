import React from "react";
import BtnCloseModal from "../button/BtnCloseModal";
import BtnSubmit from "../button/BtnSubmit";
import BtnSuccess from "../button/BtnSuccess";

export default function HospitalDetail({ detail, modal, setModal }) {
  const renderDetail = () => {
    let render = [];
    for (let i in detail) {
      render.push(
        <div>
          <label htmlFor="" className="md:mt-0 text-gray-800  font-semibold text-xl mb-2 flex items-center">
            {i}
          </label>
          <input
            type="text"
            defaultValue={detail[i]}
            className={`rounded-md text-xl text-gray-600 w-3/5 border-2 p-3  border-gray-400
       bg-gray-50 `}
          />
        </div>
      );
    }
    return render;
  };

  return modal ? (
    <div className="rounded-2xl border border-blue-100 bg-white p-8 shadow-lg">
      {renderDetail()}
      <BtnCloseModal message={"close"} setModal={setModal}></BtnCloseModal>
    </div>
  ) : (
    ""
  );
}
