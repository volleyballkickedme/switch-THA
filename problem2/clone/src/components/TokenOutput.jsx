import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import TokenSelector from "./TokenSelector";
import { useToken } from "./TokenContext";

const TokenOutput = ({ amount, title, toggle }) => {
  const TOKEN_IMAGE_LOCAL_PATH = "/tokens/";

  const [isOpen, setIsOpen] = useState(false);
  const { outputToken, setOutputToken, outputTokenPrice, setOutputTokenPrice, inputTokenPrice } = useToken();
  const priceInToken = outputTokenPrice && inputTokenPrice
  ? (amount * inputTokenPrice / outputTokenPrice).toFixed(2)
  : "0";

const priceInUSD = outputTokenPrice
  ? (amount * outputTokenPrice).toFixed(2)
  : "0";

  const getTokenImage = (symbol) => `${TOKEN_IMAGE_LOCAL_PATH}${symbol.toUpperCase()}.svg`;

  return (
    <div className={ `p-4 rounded-2xl mb-3 ${ toggle ? "bg-gray-700" : "bg-gray-900"}`}>
      <div className="flex justify-between items-center">
      <TokenSelector isOpen={isOpen} setIsOpen={setIsOpen} setOutputToken={setOutputToken} setOutputTokenPrice={setOutputTokenPrice} isInput={toggle} />
        <span className="text-gray-400"> { title } </span>
          <button
            className="flex items-center bg-gray-800 px-2 py-1 rounded-full text-white ml-auto"
            onClick={() => setIsOpen(true)}
          >
          {outputToken ? (
            <>
              <img
                src={ getTokenImage(outputToken) }
                alt={outputToken}
                className="w-6 h-6 rounded-full mr-2"
              />
            </>
          ) : (
            "Select Token"
          )}
          <IoIosArrowDown className="ml-auto" />
        </button>
      </div>
      <div className="bg-transparent w-full text-3xl mt-2 text-white outline-none">
          <span> { priceInToken || "0" }</span>
        </div>
      <div>
        <span className="text-gray-400"> ${ priceInUSD } </span>
      </div>
    </div>
  );
};

export default TokenOutput;