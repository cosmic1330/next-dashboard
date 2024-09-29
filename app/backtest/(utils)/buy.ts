import {
  isCloseAboveMa5,
  isKdGoldenCross,
} from '../../selectstock/(utils)/assessment/positive';
import { isMovingAverageTrendUp, isSufficientTradingVolume } from '../../selectstock/(utils)/conditions';
import { MaType } from '../../selectstock/(utils)/conditions/types';

const buyMethod = (stockData: any) => {
  const res = {
    status: false,
    detail: 'buy',
  };
  try {
    if (
      isSufficientTradingVolume(stockData, 0, 300) &&
      isMovingAverageTrendUp(stockData, 0, MaType.MA5) &&
      isCloseAboveMa5(stockData, 0) &&
      isKdGoldenCross(stockData, 0)
    ) {
      res.status = true;
    }
  } catch (error) {
    console.log(error);
  }
  return res;
};

export default buyMethod;
