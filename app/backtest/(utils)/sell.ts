const sellMethod = (stockData: any) => {
  const res = {
    status: false,
    detail: 'sell',
  };
  try {
    if (
      stockData[stockData.length - 1].l < stockData[stockData.length - 2].l &&
      stockData[stockData.length - 1].v > stockData[stockData.length - 2].v
    ) {
      res.status = true;
    }
  } catch (error) {
    console.log(error);
  }
  return res;
};
export default sellMethod;
