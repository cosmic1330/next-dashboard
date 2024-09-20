import { BaseStockData, BaseTaxieData } from '@/app/selectstock/types';
import { Rsi } from '@ch20026103/anysis';

export default class Rsi5Generate {
  rsi: Rsi;

  pre: any | undefined;

  data:
    | undefined
    | {
      rsi5: number;
      };

  constructor() {
    this.rsi = new Rsi();
    this.pre = undefined;
    this.data = undefined;
  }

  generate(value: BaseStockData | BaseTaxieData) {
    if (this.data === undefined) {
      this.pre = this.rsi.init(value, 5);
    } else {
      this.pre = this.rsi.next(value, this.pre, 5);
    }
    this.data = {
      rsi5: this.pre.rsi,
    };
    return this.data;
  }
}
