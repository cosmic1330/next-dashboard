export default function isTwoRedSoldiersHigherLows(
  datas: { c: number; o: number; l: number; h: number }[],
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
  const [index1, index2, index3, index4] = indices;

  if (
    datas[index1].c > datas[index1].o &&
    datas[index2].c > datas[index2].o &&
    datas[index1].c > datas[index2].h &&
    datas[index1].h > datas[index2].h &&
    datas[index1].l > datas[index2].l &&
    datas[index2].l > datas[index3].l &&
    datas[index3].h < datas[index4].h &&
    datas[index3].l < datas[index4].l
  )
    return true;
  return false;
}
