import { BaseStockData, BaseTaxieData } from '@/app/selectstock/types';
import { Boll } from '@ch20026103/anysis';

export default class BollGenerate {
  boll: Boll;

  pre: any | undefined;

  data:
    | undefined
    | {
        bollMa: number | null;
        bollUb: number | null;
        bollLb: number | null;
      };

  constructor() {
    this.boll = new Boll();
    this.pre = undefined;
    this.data = undefined;
  }

  generate(value: BaseStockData | BaseTaxieData) {
    if (this.data === undefined) {
      this.pre = this.boll.init(value);
    } else {
      this.pre = this.boll.next(value, this.pre, 20);
    }
    this.data = {
      bollMa: this.pre.bollMa,
      bollUb: this.pre.bollUb,
      bollLb: this.pre.bollLb,
    };
    return this.data;
  }
}
