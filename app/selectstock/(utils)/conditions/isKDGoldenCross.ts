import { StockData } from '../../types';

export default function isKDGoldenCross(datas: StockData[], rollback_date = 0) {
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
    datas[index1].k !== null &&
    datas[index1].d !== null &&
    datas[index2].k !== null &&
    datas[index2].d !== null &&
    datas[index3].k !== null &&
    datas[index3].d !== null &&
    datas[index1].k !== undefined &&
    datas[index1].d !== undefined &&
    datas[index2].k !== undefined &&
    datas[index2].d !== undefined &&
    datas[index3].k !== undefined &&
    datas[index3].d !== undefined
  ) {
    return (
      <number>datas[index1].k > <number>datas[index1].d &&
      <number>datas[index2].k < (datas[index2].d as number) &&
      <number>datas[index3].k < (datas[index3].d as number)
    );
  }

  return false;
}
