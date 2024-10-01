const sellMethod = (stockData: any) => {
  const res = {
    status: false,
    detail: 'sell',
  };
  try {
    if (
      stockData[stockData.length - 1].k < stockData[stockData.length - 2].k &&
      stockData[stockData.length - 1].d > stockData[stockData.length - 2].d &&
      stockData[stockData.length - 1].k > stockData[stockData.length - 1].d
    ) {
      res.status = true;
    }
  } catch (error) {
    console.log(error);
  }
  return res;
};
export default sellMethod;
