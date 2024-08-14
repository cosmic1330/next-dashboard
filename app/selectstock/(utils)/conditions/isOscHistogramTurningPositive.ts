export default function isOscHistogramTurningPositive(
  datas: { osc: number | null }[],
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
    datas[index3].osc !== null
  )
    return (
      datas[index1].osc > datas[index2].osc &&
      datas[index2].osc >= datas[index3].osc &&
      datas[index1].osc > 0 &&
      datas[index2].osc < 0
    );
  return false;
}
