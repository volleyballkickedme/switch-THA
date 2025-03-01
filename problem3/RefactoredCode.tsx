import React, { useState, useEffect, useMemo } from "react";

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string;
}

interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

class Datasource {
  private url: string;

  constructor(url: string) {
    this.url = url;
  }

  async getPrices(): Promise<Record<string, number>> {
    try {
      const response = await fetch(this.url);
      if (!response.ok) throw new Error("Failed to fetch prices");
      return response.json();
    } catch (error) {
      console.error("Error fetching prices:", error);
      return {};
    }
  }
}

const datasource = new Datasource("https://interview.switcheo.com/prices.json");

const blockchainPriorities: Record<string, number> = {
  Osmosis: 100,
  Ethereum: 50,
  Arbitrum: 30,
  Zilliqa: 20,
  Neo: 20,
};

const getPriority = (blockchain: string): number => blockchainPriorities[blockchain] || -99;

const WalletPage: React.FC<Props> = (props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const [prices, setPrices] = useState<Record<string, number>>({});

  useEffect(() => {
    let isMounted = true;

    async function fetchPrices() {
      const fetchedPrices = await datasource.getPrices();
      if (isMounted) {
        setPrices(fetchedPrices);
      }
    }

    fetchPrices();

    return () => {
      isMounted = false;
    };
  }, []);

  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance) => getPriority(balance.blockchain) > -99 && balance.amount <= 0)
      .sort((a, b) => getPriority(b.blockchain) - getPriority(a.blockchain));
  }, [balances]);

  // ✅ Generate rows dynamically
  const rows = sortedBalances.map((balance) => {
    const usdValue = prices[balance.currency] ? balance.amount * prices[balance.currency] : 0;

    return (
      <WalletRow
        className="wallet-row"
        key={balance.currency}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.amount.toFixed(2)}
      />
    );
  });

  return <div {...rest}>{rows}</div>;
};

export default WalletPage;
