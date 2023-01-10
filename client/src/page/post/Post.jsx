/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
const posts = [1, 2, 3, 4, 5, 6, 7, 8, 9];
export default function Post() {
  const [loadNew, setLoadNew] = useState(4);
  const [loadInfor, setLoadInfor] = useState(4);

  const setMore = (state, setState) => {
    setState(state + 2);
  };

  return (
    <div className="min-w-screen-lg mx-auto grid grid-cols-5 bg-gray-100 px-4 gap-5">
      {/* medical post */}
      <main className="mt-12 col-span-4  ">
        <div className="flex flex-wrap flex-col md:flex-no-wrap space-x-0 md:space-x-6 mb-16 items-center">
          <div
          // className="w-full md:w-4/7"
          >
            <h3 className="font-extrabold text-4xl text-green-800 text-center mb-10">Medical news </h3>
            {posts.slice(0, loadNew).map((post, index) => {
              return (
                <div className="rounded bg-white  flex flex-col md:flex-row mb-10 shadow-2xl">
                  <img
                    src="https://www.statnews.com/wp-content/uploads/2022/03/AdobeStock_246942922.jpeg"
                    className="block md:hidden lg:block rounded-md h-64 md:h-32 m-4 md:m-0"
                  />
                  <div className="rounded px-4">
                    <span className="text-green-700 text-sm hidden md:block"> Time 18/10/2022 </span>
                    <div className="md:mt-0 text-gray-800 font-semibold text-xl mb-2">
                      High protein breakfast may help prevent overeating and obesity
                    </div>
                    <p className="p-2 pl-0 pt-1 text-sm text-gray-600">
                      Another study found that inpatient adults exposed to ultra-processed diets ingested more carbohydrates, fat, and total energy
                      than those on unprocessed diets and consequently gained weight.
                    </p>
                    <div className="flex space-x-4">
                      <p className="hover:scale-150 text-red-600 text-2xl">♥</p>
                      <p className="hover:scale-150 text-2xl">👍</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <button
            className="bg-slate-300 p-4 text-xl capitalize rounded-md animate-bounce"
            onClick={() => {
              setMore(loadNew, setLoadNew);
            }}
          >
            see more
          </button>
        </div>
      </main>
      {/* new about hospital/admin/policy */}
      <main className="mt-12  ">
        <div className="flex flex-wrap md:flex-no-wrap flex-col space-x-0 md:space-x-6 mb-16 items-center">
          <div
          // className="w-full md:w-4/7 "
          >
            <h3 className="font-extrabold text-4xl text-green-800 text-center mb-10">infor </h3>
            {posts?.slice(0, loadInfor).map((post, index) => {
              return (
                <div className="rounded w-full flex flex-col md:flex-row mb-10 shadow-lg">
                  <div className="bg-white rounded px-4">
                    <span className="text-green-700 text-xs hidden md:block"> Time 18/10/2022 </span>
                    <div className="md:mt-0 text-gray-800 font-semibold text-sm mb-2">
                      At every tiled on ye defer do. No attention suspected oh difficult.
                    </div>
                    <p className="block md:hidden p-2 pl-0 pt-1 text-sm font-extralight text-gray-600">
                      Wonder matter now can estate esteem assure fat roused. Am performed on existence as discourse is. Pleasure friendly at marriage
                      blessing or
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <button
            className="bg-slate-300 p-4 text-sm capitalize rounded-md animate-bounce"
            onClick={() => {
              setMore(loadInfor, setLoadInfor);
            }}
          >
            see more
          </button>
        </div>
      </main>
    </div>
  );
}
