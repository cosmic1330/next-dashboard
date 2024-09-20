import { BaseStockData, BaseTaxieData } from '@/app/selectstock/types';
import { Rsi } from '@ch20026103/anysis';

export default class Rsi10Generate {
  rsi: Rsi;

  pre: any | undefined;

  data:
    | undefined
    | {
      rsi10: number;
      };

  constructor() {
    this.rsi = new Rsi();
    this.pre = undefined;
    this.data = undefined;
  }

  generate(value: BaseStockData | BaseTaxieData) {
    if (this.data === undefined) {
      this.pre = this.rsi.init(value, 10);
    } else {
      this.pre = this.rsi.next(value, this.pre, 10);
    }
    this.data = {
      rsi10: this.pre.rsi,
    };
    return this.data;
  }
}
