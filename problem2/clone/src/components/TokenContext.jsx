import React, { createContext, useState, useContext } from "react";

// ✅ Create Context
const TokenContext = createContext();

// ✅ Create Provider Component
export const TokenProvider = ({ children }) => {
  const [inputToken, setInputToken] = useState(null);
  const [outputToken, setOutputToken] = useState(null);
  const [inputTokenPrice, setInputTokenPrice] = useState(0);
  const [outputTokenPrice, setOutputTokenPrice] = useState(0);

  return (
    <TokenContext.Provider 
      value={{
        inputToken, setInputToken,
        outputToken, setOutputToken,
        inputTokenPrice, setInputTokenPrice,
        outputTokenPrice, setOutputTokenPrice
      }}
    >
      {children}
    </TokenContext.Provider>
  );
};

// ✅ Custom Hook for easier access
export const useToken = () => useContext(TokenContext);

