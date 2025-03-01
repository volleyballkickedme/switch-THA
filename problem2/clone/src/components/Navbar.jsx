import React from "react";

const Navbar = () => {
  return (
    <nav className="w-full max-w-4xl flex justify-between items-center p-4 text-white">
      <div className="text-xl font-bold">Uniswap</div>
      <div className="flex space-x-4">
        <button className="text-gray-400">Trade</button>
        <button className="text-gray-400">Explore</button>
        <button className="text-gray-400">Pool</button>
      </div>
      <button className="bg-purple-600 px-4 py-2 rounded-full text-white">
        Connect
      </button>
    </nav>
  );
};

export default Navbar;
