export default function isSufficientTradingVolume(
  datas: { v: number }[],
  rollback_date = 0,
  min: number = 1000,
) {
  let length = datas.length - 1;
  const indices = [length - rollback_date];
  if (indices.some((index) => index < 0 || index >= datas.length)) {
    return false;
  }
  const [index1] = indices;
  if (datas[index1].v > min) return true;
  return false;
}
