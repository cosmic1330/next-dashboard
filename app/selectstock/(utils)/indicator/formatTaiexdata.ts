import { PrismaTaiexResponse } from '@/app/api/taiwan-stock/v2/taiex/types';
import FormateDate from '@/utils/formateStrDate';
import { BaseTaxieData } from '../../types';

export default function formatTaiexdata(
  data: PrismaTaiexResponse,
): BaseTaxieData[] {
  let res: BaseTaxieData[] = [];
  if (data.length > 0)
    res = data.map((item) => ({
      t: FormateDate(item.transaction_date),
      c: parseFloat(`${item.close_price}`),
      h: parseFloat(`${item.high_price}`),
      l: parseFloat(`${item.low_price}`),
      o: parseFloat(`${item.open_price}`),
    }));
  return res;
}
