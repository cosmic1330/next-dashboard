/* *****************
 1. V2PlansTable/tworedsoldier (ok)
 2. GeneralizedPlansTable/slopepositive (ok)
 3. SaraPlansTable/bullishpolevault (ok)
***************** */

import bullishpolevault from "@/app/selectstock/(components)/Plan/SaraPlansTable/(hooks)/plans/bullishpolevault";

const buyMethod = (stockData: any) => {
  const res = {
    status: false,
    detail: 'buy',
  };
  try {
    if (bullishpolevault(stockData, 0)) {
      res.status = true;
    }
  } catch (error) {
    console.log(error);
  }
  return res;
};

export default buyMethod;
