import { StockData } from '../../types';

export default function isMacdPositiveWithDecreasingGreenBars(
  datas: StockData[],
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
    datas[index1].ma5 !== null &&
    datas[index1].macd !== null &&
    datas[index2].macd !== null &&
    datas[index1].dif !== null &&
    datas[index2].dif !== null &&
    datas[index1].osc !== null &&
    datas[index2].osc !== null &&
    datas[index3].osc !== null &&
    datas[index1].ma5 !== undefined &&
    datas[index1].macd !== undefined &&
    datas[index2].macd !== undefined &&
    datas[index1].dif !== undefined &&
    datas[index2].dif !== undefined &&
    datas[index1].osc !== undefined &&
    datas[index2].osc !== undefined &&
    datas[index3].osc !== undefined
  ) {
    return (
      datas[index1].c > <number>datas[index1].ma5 &&
      <number>datas[index1].osc > <number>datas[index2].osc &&
      <number>datas[index2].osc > <number>datas[index3].osc
    );
  }

  return false;
}
