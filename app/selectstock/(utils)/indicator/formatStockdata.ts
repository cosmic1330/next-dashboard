import { PrismaDailyDealResponseResponse, YahooDailyDealResponseResponse } from '@/app/api/taiwan-stock/v2/daily_deal/types';
import FormateDate from '@/utils/formateStrDate';
import { BaseStockData } from '../../types';

export default function formatStockdata(
  data: PrismaDailyDealResponseResponse | YahooDailyDealResponseResponse,
  stock_id: string,
): BaseStockData[] {
  return data.map((item) => ({
    id: stock_id,
    t: FormateDate(item.transaction_date),
    c: parseFloat(`${item.close_price}`),
    h: parseFloat(`${item.high_price}`),
    l: parseFloat(`${item.low_price}`),
    o: parseFloat(`${item.open_price}`),
    v: item.volume,
    foreign_investors: item.legal_person[0]?.foreign_investors || 0,
    investment_trust: item.legal_person[0]?.investment_trust || 0,
    dealer: item.legal_person[0]?.dealer || 0,
  }));
}
