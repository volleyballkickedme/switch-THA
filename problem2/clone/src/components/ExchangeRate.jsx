import React from "react";
import { IoIosInformationCircleOutline } from "react-icons/io";

const ExchangeRate = () => {
  return (
    <div className="flex justify-between items-center text-gray-400 text-sm mt-3">
      <span></span>
      <div className="flex items-center">
        <IoIosInformationCircleOutline className="mr-1" />
      </div>
    </div>
  );
};

export default ExchangeRate;
