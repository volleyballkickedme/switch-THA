import React, { useState } from "react";
import { IoMdArrowDown } from "react-icons/io";
import TokenInput from "./TokenInput";
import TokenOutput from "./TokenOutput";
import SwapButton from "./SwapButton";
import ExchangeRate from "./ExchangeRate";
import { useToken } from "./TokenContext";

const SwapBox = () => {
  const [amount, setAmount] = useState(0);
  const [toggle, setToggle] = useState(false);
  const { inputToken, outputToken, inputTokenPrice, outputTokenPrice } = useToken();

  return (
    <div className="w-full max-w-lg bg-gray-900 p-6 rounded-2xl shadow-xl mt-10">
      <div className="flex space-x-4 mb-4">
        <button className="bg-gray-800 text-white px-4 py-2 rounded-full">Swap</button>
        <button className="text-gray-400">Limit</button>
        <button className="text-gray-400">Send</button>
        <button className="text-gray-400">Buy</button>
      </div>

      {toggle ? (
        <TokenInput 
          amount={amount} 
          setAmount={setAmount} 
          title="Buy" 
          toggle={toggle}
        />
      ) : (
        <TokenOutput 
          amount={amount} 
          title="Buy" 
          toggle={toggle} 
        />
      )}

      {/* Swap Arrow */}
      <div className="flex justify-center my-2">
        <button className="bg-gray-800 p-3 rounded-full" onClick={() => setToggle(!toggle)}>
          <IoMdArrowDown className="text-white text-xl" />
        </button>
      </div>

      {toggle ? (
        <TokenOutput 
          amount={amount} 
          title="Sell" 
          toggle={!toggle} 
        />
      ) : (
        <TokenInput 
          amount={amount} 
          setAmount={setAmount} 
          title="Sell" 
          toggle={!toggle} 
          isOutput={true}
        />
      )}

      <SwapButton connected={false} />

      <ExchangeRate />
    </div>
  );
};

export default SwapBox;

