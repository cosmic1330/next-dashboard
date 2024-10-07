import { Button } from '@mui/material';

export default function Clear() {
  const handleClear = () => {
    // condition
    window.localStorage.removeItem('nextdashboard.condition.sell');
    window.localStorage.removeItem('nextdashboard.condition.buy');
    window.localStorage.removeItem('nextdashboard.condition.marketSentiment');
    window.localStorage.removeItem('nextdashboard.condition.reviewPurchaseList');
    window.localStorage.removeItem('nextdashboard.condition.reviewSellList');
    // backtest
    window.localStorage.removeItem('nextdashboard.backtest.startDate');
    window.localStorage.removeItem('nextdashboard.backtest.endDate');
    window.localStorage.removeItem('nextdashboard.backtest.lowStockPrice');
    window.localStorage.removeItem('nextdashboard.backtest.hightStockPrice');
    window.localStorage.removeItem('nextdashboard.backtest.capital');
    window.localStorage.removeItem('nextdashboard.backtest.buyPrice');
    window.localStorage.removeItem('nextdashboard.backtest.sellPrice');
  };

  return (
    <Button onClick={handleClear} variant="outlined" size="small">
      Clear Setting
    </Button>
  );
}
