import { StockData, TaxieData } from '../../types';

export default function isBearishEngulfing(
  datas: StockData[] | TaxieData[],
  rollback_date = 0,
) {
  let length = datas.length - 1;

  const indices = [length - rollback_date, length - (rollback_date + 1)];
  if (indices.some((index) => index < 0 || index >= datas.length)) {
    return false;
  }
  const [index1, index2] = indices;

  if (
    datas[index1].h > datas[index2].h &&
    datas[index1].l < datas[index2].l &&
    datas[index1].c > datas[index2].c &&
    datas[index1].c > datas[index1].o &&
    datas[index2].c < datas[index2].o
  )
    return true;
  return false;
}
