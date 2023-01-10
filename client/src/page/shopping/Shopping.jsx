/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
const items = [1, 2, 3, 4, 5, 5, 6, 6, 54, 54];
export default function Shopping() {
  return (
    <div>
      <h3 className="font-extrabold text-4xl text-green-800 text-center my-10">New Medical Product </h3>
      <div className="flex flex-wrap w-4/5 m-auto gap-4 justify-center">
        {items.slice(0, 4)?.map((item, index) => {
          return (
            <div className="rounded bg-teal-50 flex flex-row sm:flex-col w-full sm:w-3/12 shadow-2xl ">
              <h3 className="text-center text-3xl py-3 ">machine</h3>
              <img
                src="https://www.statnews.com/wp-content/uploads/2022/03/AdobeStock_246942922.jpeg"
                className="block md:hidden lg:block rounded-md h-64 md:h-32 m-4 md:m-0 w-full"
              />
              <div className="rounded px-4">
                <span className="text-green-700 text-sm hidden md:block"> Time 18/10/2022 </span>
                <div className="md:mt-0 text-gray-800 font-semibold text-xl mb-2">Blood test </div>
                <p className="block  p-2 pl-0 pt-1 text-sm text-gray-600">
                  Wonder matter now can estate esteem assure fat roused. Am performed on existence as discourse is. Pleasure friendly at marriage
                  blessing or
                </p>
                <p className="block  p-2 pl-0 pt-1 text-sm text-gray-600">Price : 400€</p>
                <div className="flex space-x-4 justify-between mb-5">
                  <button className="bg-slate-200 p-4 text-xl capitalize rounded-lg">
                    add
                    <AddShoppingCartIcon></AddShoppingCartIcon>
                  </button>
                  <button className="bg-slate-200 p-4 text-xl capitalize rounded-lg">
                    see more
                    <AddShoppingCartIcon></AddShoppingCartIcon>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
