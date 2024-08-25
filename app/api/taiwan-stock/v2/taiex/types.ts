import { Decimal } from '@prisma/client/runtime/library';

export type PrismaTaiexResponseRow = {
  transaction_date: Date;
  open_price: Decimal;
  close_price: Decimal;
  high_price: Decimal;
  low_price: Decimal;
};

export type PrismaTaiexResponse = PrismaTaiexResponseRow[];
