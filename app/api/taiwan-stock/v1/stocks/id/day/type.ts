export type StocksType = [
  string, // '證券代號',
  string, // '證券名稱',
  string, // '殖利率(%)',
  string, // '股利年度',
  string, // '本益比',
  string, // '股價淨值比',
  string, // '財報年/季',
];

export type ItemType = {
  h: number;
  l: number;
  c: number;
  v: number;
  t: number;
  o: number;
}[];
