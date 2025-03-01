import React from "react";

const SwapButton = ({ connected }) => {
  return (
    <button className="w-full bg-purple-700 hover:bg-purple-800 py-3 rounded-lg font-semibold text-white transition">
      {connected ? "Confirm Swap" : "Connect Wallet"}
    </button>
  );
};

export default SwapButton;
