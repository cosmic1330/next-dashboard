import { StockData, TaxieData } from '../../types';

export default function isOscHistogramTurningPositive(
  datas: StockData[] | TaxieData[],
  rollback_date = 0,
) {
  let length = datas.length - 1;

  const indices = [
    length - rollback_date,
    length - (rollback_date + 1),
    length - (rollback_date + 2),
  ];
  if (indices.some((index) => index < 0 || index >= datas.length)) {
    return false;
  }
  const [index1, index2, index3] = indices;

  if (
    datas[index1].osc !== null &&
    datas[index2].osc !== null &&
    datas[index3].osc !== null &&
    datas[index1].osc !== undefined &&
    datas[index2].osc !== undefined &&
    datas[index3].osc !== undefined
  )
    return (
      <number>datas[index1].osc > <number>datas[index2].osc &&
      <number>datas[index2].osc >= <number>datas[index3].osc &&
      <number>datas[index1].osc > 0 &&
      <number>datas[index2].osc < 0
    );
  return false;
}
