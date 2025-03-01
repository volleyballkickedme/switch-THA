import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import ReactDOM from "react-dom";
import { useToken } from "./TokenContext";
import tokenPrices from "../assets/token-prices.json";

const TOKEN_IMAGE_LOCAL_PATH = "/tokens/";

const TokenSelector = ({ isOpen, setIsOpen, isInput }) => {
  const [search, setSearch] = useState("");
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(true);
  const {
    setInputToken, setInputTokenPrice,
    setOutputToken, setOutputTokenPrice
  } = useToken();

  useEffect(() => {
    try {
      const tokenList = [];
      const seenSymbols = new Set();

      tokenPrices.forEach((entry) => {
        if (!seenSymbols.has(entry.currency)) {
          seenSymbols.add(entry.currency);
          tokenList.push({
            symbol: entry.currency,
            price: entry.price,
          });
        }
      });

      setTokens(tokenList);
      setLoading(false);
    } catch (error) {
      console.error("Failed to load token prices:", error);
      setLoading(false);
    }
  }, []);

  const filteredTokens = tokens.filter((token) =>
    token.symbol.toLowerCase().includes(search.toLowerCase())
  );

  const getTokenImage = (symbol) => `${TOKEN_IMAGE_LOCAL_PATH}${symbol.toUpperCase()}.svg`;

  const handleSelect = (token) => {
    if (isInput) {
      setInputToken(token.symbol);
      setInputTokenPrice(token.price); 
    } else {
      setOutputToken(token.symbol);
      setOutputTokenPrice(token.price);
    }

    setIsOpen(false);
  };

  const handleBackgroundClick = (e) => {
    if (e.target.id === "modal-background") {
      setIsOpen(false);
    }
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      id="modal-background"
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex justify-center items-center z-50"
      onClick={handleBackgroundClick}
    >
      <div className="w-full max-w-md bg-[#111] text-white rounded-2xl shadow-lg p-5 relative">
        <div className="flex justify-between items-center pb-3 border-b border-gray-700">
          <h3 className="text-lg font-semibold">Select a {isInput ? "Sell" : "Buy"} Token</h3>
          <button onClick={() => setIsOpen(false)}>
            <IoMdClose className="text-gray-400 hover:text-white text-2xl" />
          </button>
        </div>

        <div className="flex items-center bg-gray-800 p-2 rounded-lg mt-3">
          <FaSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search tokens"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent outline-none text-white w-full"
          />
        </div>

        <div className="mt-3 max-h-72 overflow-y-auto">
          {loading ? (
            <p className="text-center text-gray-400">Loading tokens...</p>
          ) : filteredTokens.length === 0 ? (
            <p className="text-center text-gray-400">No tokens found</p>
          ) : (
            filteredTokens.map((token) => (
              <button
                key={token.symbol}
                className="flex items-center w-full p-3 hover:bg-gray-800 rounded-lg"
                onClick={() => handleSelect(token)}
              >
                <img
                  src={getTokenImage(token.symbol)}
                  alt={token.symbol}
                  className="w-6 h-6 rounded-full mr-3"
                  onError={(e) => (e.target.src = "/default-token.svg")}
                />
                <div className="flex-1">
                  <p className="font-medium">{token.symbol}</p>
                  <p className="text-sm text-gray-400">${token.price.toFixed(4)}</p>
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </div>,
    document.getElementById("portal-root")
  );
};

export default TokenSelector;


