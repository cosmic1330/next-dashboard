type DataPoint = {
  c: number;
  o: number;
  h: number;
  l: number;
};

export default function isTShapedCandle(
  datas: DataPoint[],
  rollback_date = 0,
) {
  let length = datas.length - 1;
  const indices = [length - rollback_date];
  if (indices.some((index) => index < 0 || index >= datas.length)) {
    return false;
  }
  const [index1] = indices;
  if (
    datas[index1].c > datas[index1].o &&
    ((datas[index1].h - datas[index1].c) / datas[index1].c) * 100 <= 1 &&
    ((datas[index1].c - datas[index1].l) / datas[index1].l) * 100 >= 5 &&
    ((datas[index1].o - datas[index1].l) / datas[index1].l) * 100 >= 3
  )
    return true;
  return false;
}
