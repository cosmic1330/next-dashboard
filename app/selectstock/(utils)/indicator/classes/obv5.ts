import { BaseStockData } from '@/app/selectstock/types';
import { Obv } from '@ch20026103/anysis';

export default class Obv5Generate {
  obv: Obv;

  pre: any | undefined;

  data:
    | undefined
    | {
        obv: number;
        obv5Ma: number;
      };

  constructor() {
    this.obv = new Obv();
    this.pre = undefined;
    this.data = undefined;
  }

  generate(value: BaseStockData) {
    if (this.data === undefined) {
      this.pre = this.obv.init(value, 5);
    } else {
      this.pre = this.obv.next(value, this.pre, 5);
    }
    this.data = { obv: this.pre.obv, obv5Ma: this.pre.obvMa };
    return this.data;
  }
}
