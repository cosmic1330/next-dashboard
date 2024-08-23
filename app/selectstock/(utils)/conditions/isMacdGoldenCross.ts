import { StockData } from '../../types';

export default function isMacdGoldenCross(
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
    datas[index1].macd !== null &&
    datas[index1].dif !== null &&
    datas[index2].macd !== null &&
    datas[index2].dif !== null &&
    datas[index3].macd !== null &&
    datas[index3].dif !== null &&
    datas[index1].macd !== undefined &&
    datas[index1].dif !== undefined &&
    datas[index2].macd !== undefined &&
    datas[index2].dif !== undefined &&
    datas[index3].macd !== undefined &&
    datas[index3].dif !== undefined
  ) {
    return (
      <number>datas[index1].macd < (datas[index1].dif as number) &&
      <number>datas[index2].macd > (datas[index2].dif as number) &&
      <number>datas[index3].macd > (datas[index3].dif as number)
    );
  }

  return false;
}
