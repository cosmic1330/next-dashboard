import { StockData, TaxieData } from '../../types';

export default function isBounceOffTheLowerBollingerBand(
  datas: StockData[] | TaxieData[],
  rollback_date = 0,
) {
  let length = datas.length - 1;

  const indices = [
    length - rollback_date,
    length - (rollback_date + 1),
    length - (rollback_date + 2),
    length - (rollback_date + 3),
  ];
  if (indices.some((index) => index < 0 || index >= datas.length)) {
    return false;
  }
  const [index1, index2] = indices;

  if (
    datas[index1].bollLb !== null &&
    datas[index1].bollLb !== undefined &&
    datas[index2].bollLb !== null &&
    datas[index2].bollLb !== undefined &&
    datas[index1].l > datas[index2].l &&        /* 不低於前低 */
    datas[index2].l < datas[index2].bollLb &&   /* 昨日跌破下軌 */
    datas[index1].l > datas[index1].bollLb &&   /* 今天最低價在下軌之上 */
    datas[index1].c > datas[index1].bollLb &&   /* 今天收盤價在下軌之上 */
    datas[index1].c > datas[index2].c &&        /* 收盤價高於昨日 */
    datas[index1].c > datas[index1].o           /* 收紅 */
  )
    return true;
  return false;
}
