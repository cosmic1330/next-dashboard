import slopepositive from '@/app/selectstock/(components)/Plan/GeneralizedPlansTable/(hooks)/plans/slopepositive';
import tworedsoldier from '@/app/selectstock/(components)/Plan/V2PlansTable/(hooks)/plans/tworedsoldier';

const buyMethod = (stockData: any) => {
  const res = {
    status: false,
    detail: 'buy',
  };
  try {
    if (slopepositive(stockData, 0)) {
      res.status = true;
    }
  } catch (error) {
    console.log(error);
  }
  return res;
};

export default buyMethod;
