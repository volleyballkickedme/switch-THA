import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import TokenSelector from "./TokenSelector";
import { useToken } from "./TokenContext";

const TokenInput = ({ amount, setAmount, title, toggle }) => {
  const TOKEN_IMAGE_LOCAL_PATH = "/tokens/";

  const [isOpen, setIsOpen] = useState(false);
  const { inputToken, setInputToken, inputTokenPrice, setInputTokenPrice } = useToken();

  const priceInUSD = amount ? (amount * inputTokenPrice).toFixed(2) : "0";
  const getTokenImage = (symbol) => symbol ? `${TOKEN_IMAGE_LOCAL_PATH}${symbol.toUpperCase()}.svg` : "/default-token.svg";

  const handleInput = (e) => {
    let value = e.target.value;

    if (value.startsWith("0") && value.length > 1 && value[1] !== ".") {
      value = value.replace(/^0+/, "");
    }

    value = value.replace(/[^0-9.]/g, "");

    const parts = value.split(".");
    if (parts.length > 2) {
      value = parts[0] + "." + parts.slice(1).join("");
    }

    setAmount(value);
  };

  return (
    <div className={`p-4 rounded-2xl mb-3 ${toggle ? "bg-gray-700" : "bg-gray-900"}`}>
      <div className="flex justify-between items-center">
        <span className="text-gray-400">{title}</span>
        <button
          className="flex items-center bg-gray-800 px-2 py-1 rounded-full text-white ml-auto"
          onClick={() => setIsOpen(true)}
        >
          {inputToken ? (
            <>
              <img
                src={getTokenImage(inputToken)}
                alt={inputToken}
                className="w-6 h-6 rounded-full mr-2"
              />
              {inputToken}
            </>
          ) : (
            "Select Token"
          )}
          <IoIosArrowDown className="ml-auto" />
        </button>
      </div>

      <TokenSelector isOpen={isOpen} setIsOpen={setIsOpen} isInput={toggle} />

      <input
        type="text"
        inputMode="decimal"
        placeholder="0"
        className="bg-transparent w-full text-3xl mt-2 text-white outline-none"
        value={amount}
        onChange={handleInput}
      />

      <span className="text-gray-400">${priceInUSD}</span>
    </div>
  );
};

export default TokenInput;
