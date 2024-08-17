export type BaseStockData = {
  id: string;
  t: number;
  c: number;
  h: number;
  l: number;
  o: number;
  v: number;
  foreign_investors: number;
  investment_trust: number;
  dealer: number;
};

export type StockData = BaseStockData & {
  rsv?: number | null;
  k?: number | null;
  d?: number | null;
  'k-d'?: number | null;
  bollMa?: number | null;
  bollUb?: number | null;
  bollLb?: number | null;
  ma5?: number;
  exclusionValueMa5?: {
    'd+1': number;
    d: number;
    'd-1': number;
  };
  ma10?: number;
  exclusionValueMa10?: {
    'd+1': number;
    d: number;
    'd-1': number;
  };
  ma20?: number;
  exclusionValueMa20?: {
    'd+1': number;
    d: number;
    'd-1': number;
  };
  ma60?: number;
  exclusionValueMa60?: {
    'd+1': number;
    d: number;
    'd-1': number;
  };
  ma120?: number;
  exclusionValueMa120?: {
    'd+1': number;
    d: number;
    'd-1': number;
  };
  ma240?: number;
  exclusionValueMa240?: {
    'd+1': number;
    d: number;
    'd-1': number;
  };
  ema12?: number | null;
  ema26?: number | null;
  macd?: number | null;
  osc?: number | null;
  dif?: number;
  obv?: number;
  obv5Ma?: number;
  obv10Ma?: number;
};

export type ResGoldType = {
  superStrong: number;
  strong: number;
  middle: number;
  weak: number;
  superWeak: number;
  highestPointDate: number;
  highestPoint: number;
  lowestPointDate: number;
  lowestPoint: number;
};
