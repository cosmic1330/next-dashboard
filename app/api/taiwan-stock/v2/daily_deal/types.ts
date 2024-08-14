import { Decimal } from '@prisma/client/runtime/library';
export type PrismaDailyDealResponseRow = {
  legal_person: {
    transaction_date: Date;
    foreign_investors: number;
    investment_trust: number;
    dealer: number;
  }[];
} & {
  transaction_date: Date;
  stock_id: string;
  stock_name: string;
  volume: number;
  open_price: Decimal;
  close_price: Decimal;
  high_price: Decimal;
  low_price: Decimal;
};

export type YahooDailyDealResponseRow = {
  transaction_date: string;
  stock_id: any;
  stock_name: any;
  volume: number;
  open_price: number;
  close_price: number;
  high_price: number;
  low_price: number;
  legal_person: {
    transaction_date: string;
    foreign_investors: number;
    investment_trust: number;
    dealer: number;
  }[];
};

export type PrismaDailyDealResponseResponse = PrismaDailyDealResponseRow[];
export type YahooDailyDealResponseResponse = YahooDailyDealResponseRow[];

