interface WalletBalance {
    currency: string;
    amount: number;
  }
  interface FormattedWalletBalance {
    currency: string;
    amount: number;
    formatted: string;
  }
  
  class Datasource {
    // TODO: Implement datasource class
  }
  
  interface Props extends BoxProps {
  
  }
  const WalletPage: React.FC<Props> = (props: Props) => {
    const { children, ...rest } = props;
    const balances = useWalletBalances();
      const [prices, setPrices] = useState({});
    // Unnecessary creation of Datasource instance on every render
    // Dependency array is empty, so component only renders on mount, but if the API changes, 
    // the component will not re-render and the data is not updated
    useEffect(() => {
      const datasource = new Datasource("https://interview.switcheo.com/prices.json");
      datasource.getPrices().then(prices => {
        setPrices(prices);
      }).catch(error => {
        // should be console.error(error)
        console.err(error);
      });
    }, []);
  
    // Should use a dictionary to store the priority of each blockchain because looping through the balances array
    // on every render is inefficient
      const getPriority = (blockchain: any): number => {
        switch (blockchain) {
          case 'Osmosis':
            return 100
          case 'Ethereum':
            return 50
          case 'Arbitrum':
            return 30
          case 'Zilliqa':
            return 20
          case 'Neo':
            return 20
          default:
            return -99
        }
      }
  
    const sortedBalances = useMemo(() => {
      return balances.filter((balance: WalletBalance) => {
            const balancePriority = getPriority(balance.blockchain);
            // lhsPriority is not defined, should be balancePriority instead
            if (lhsPriority > -99) {
               if (balance.amount <= 0) {
                 return true;
               }
            }
            return false
          }).sort((lhs: WalletBalance, rhs: WalletBalance) => {
            const leftPriority = getPriority(lhs.blockchain);
            const rightPriority = getPriority(rhs.blockchain);
            if (leftPriority > rightPriority) {
              return -1;
            } else if (rightPriority > leftPriority) {
              return 1;
            }
      });
    }, [balances, prices]);
  
    // variable initialized but never used
    const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
      return {
        ...balance,
        formatted: balance.amount.toFixed()
      }
    })
  
    // sortedBalances contains WalletBalance objects, not FormattedWalletBalance objects
    const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
      const usdValue = prices[balance.currency] * balance.amount;
      return (
        <WalletRow 
          className={classes.row}
          // should not use index as key, because it can change if the order of the balances changes
          key={index}
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      )
    })
  
    return (
      <div {...rest}>
        {rows}
      </div>
    )
  }