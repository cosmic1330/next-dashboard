import { BaseStockData } from '@/app/selectstock/types';
import { Macd } from '@ch20026103/anysis';

export default class MacdGenerate {
  macd: Macd;

  pre: any | undefined;

  data:
    | undefined
    | {
        ema12: number | null;
        ema26: number | null;
        macd: number | null;
        osc: number | null;
        dif: number;
      };

  constructor() {
    this.macd = new Macd();
    this.pre = undefined;
    this.data = undefined;
  }

  generate(value: BaseStockData) {
    if (this.data === undefined) {
      this.pre = this.macd.init(value);
    } else {
      this.pre = this.macd.next(value, this.pre);
    }
    this.data = {
      macd: this.pre.macd,
      ema12: this.pre.ema12,
      ema26: this.pre.ema26,
      osc: this.pre.osc,
      dif: this.pre.dif[this.pre.dif.length - 1],
    };
    return this.data;
  }
}
