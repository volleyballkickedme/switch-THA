import React from "react";
import Navbar from "./components/Navbar";
import SwapBox from "./components/SwapBox";
import { TokenProvider } from "./components/TokenContext";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-black text-white p-4">
      <Navbar />
      <TokenProvider>
        <SwapBox />
      </TokenProvider>
    </div>
  );
};

export default App;



