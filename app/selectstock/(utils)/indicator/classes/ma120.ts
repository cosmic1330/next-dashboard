import { BaseStockData } from '@/app/selectstock/types';
import { Ma } from '@ch20026103/anysis';

export default class Ma120Generate {
  ma: Ma;

  pre: any | undefined;

  data:
    | undefined
    | {
        ma120: number;
        exclusionValueMa120: {
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
      this.pre = this.ma.init(value, 120);
    } else {
      this.pre = this.ma.next(value, this.pre, 120);
    }
    this.data = {
      ma120: this.pre.ma,
      exclusionValueMa120: this.pre.exclusionValue,
    };
    return this.data;
  }
}
