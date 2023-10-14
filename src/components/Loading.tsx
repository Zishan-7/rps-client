import React from "react";

const Loading = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div
        className="w-16 h-16 rounded-full animate-spin
                    border-2 border-solid border-black border-t-transparent"
      ></div>
      <p className="text-black text-lg mt-3">
        Please wait... this might take some time
      </p>
    </div>
  );
};

export default Loading;
