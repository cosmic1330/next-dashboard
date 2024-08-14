export default function isMacdGoldenCross(
  datas: { dif: number | null; macd: number | null }[],
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
    datas[index3].dif !== null
  ) {
    return (
      datas[index1].macd < datas[index1].dif &&
      datas[index2].macd > datas[index2].dif &&
      datas[index3].macd > datas[index3].dif
    );
  }

  return false;
}
