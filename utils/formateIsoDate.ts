export default function formateIsoDate(date: number) {
  // 將數字轉換為字串
  const originalDateString = date.toString();

  // 從字串中提取出年、月、日部分
  const year = originalDateString.slice(0, 4);
  const month = originalDateString.slice(4, 6);
  const day = originalDateString.slice(6, 8);

  // 組合成 ISO 8601 格式的日期字串
  const isoDateString = `${year}-${month}-${day}`;
  return isoDateString;
}
