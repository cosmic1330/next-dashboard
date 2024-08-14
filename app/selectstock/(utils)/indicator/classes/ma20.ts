import { BaseStockData } from '@/app/selectstock/types';
import { Ma } from '@ch20026103/anysis';

export default class Ma20Generate {
  ma: Ma;

  pre: any | undefined;

  data:
    | undefined
    | {
        ma20: number;
        exclusionValueMa20: {
          'd+1': number;
          d: number;
          'd-1': number;
        };
      };

  constructor() {
    this.ma = new Ma();
    this.pre = undefined;
    this.data = undefined;
  }

  generate(value: BaseStockData) {
    if (this.data === undefined) {
      this.pre = this.ma.init(value, 20);
    } else {
      this.pre = this.ma.next(value, this.pre, 20);
    }
    this.data = {
      ma20: this.pre.ma,
      exclusionValueMa20: this.pre.exclusionValue,
    };
    return this.data;
  }
}
