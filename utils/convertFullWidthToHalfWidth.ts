// 將全角數字轉換為半角數字的函數
export default function convertFullWidthToHalfWidth(str: string) {
  return str.replace(/[\uFF10-\uFF19]/g, function (ch) {
    return String.fromCharCode(ch.charCodeAt(0) - 0xfee0);
  });
}
