import { BaseStockData, BaseTaxieData } from '@/app/selectstock/types';
import { Ema } from '@ch20026103/anysis';

export default class Ema20Generate {
  ema: Ema;

  pre: any | undefined;

  data:
    | undefined
    | {
        ema20: number;
      };

  constructor() {
    this.ema = new Ema();
    this.pre = undefined;
    this.data = undefined;
  }

  generate(value: BaseStockData | BaseTaxieData) {
    if (this.data === undefined) {
      this.pre = this.ema.init(value, 5);
    } else {
      this.pre = this.ema.next(value, this.pre, 5);
    }
    this.data = {
      ema20: this.pre.ema,
    };
    return this.data;
  }
}
