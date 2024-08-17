import { StockData } from '@/app/selectstock/types';

export default function isMacdMomentumBuildUp(
  datas: StockData[],
  rollback_date: number,
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
    datas[index1].osc === undefined ||
    datas[index1].osc === null ||
    datas[index2].osc === undefined ||
    datas[index2].osc === null ||
    datas[index3].osc === undefined ||
    datas[index3].osc === null ||
    datas[index1].macd === undefined ||
    datas[index1].macd === null ||
    datas[index2].macd === undefined ||
    datas[index2].macd === null ||
    datas[index3].macd === undefined ||
    datas[index3].macd === null
  ) {
    return false;
  }

  if (
    datas[index1].osc > datas[index2].osc &&
    datas[index2].osc > datas[index3].osc &&
    datas[index1].macd > datas[index2].macd &&
    datas[index2].macd > datas[index3].macd
  ) {
    return 'Macd多方動能漸強';
  }
  return false;
}