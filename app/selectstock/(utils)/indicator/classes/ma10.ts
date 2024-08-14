import { BaseStockData } from '@/app/selectstock/types';
import { Ma } from '@ch20026103/anysis';

export default class Ma10Generate {
  ma: Ma;

  pre: any | undefined;

  data:
    | undefined
    | {
        ma10: number;
        exclusionValueMa10: {
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
      this.pre = this.ma.init(value, 10);
    } else {
      this.pre = this.ma.next(value, this.pre, 10);
    }
    this.data = {
      ma10: this.pre.ma,
      exclusionValueMa10: this.pre.exclusionValue,
    };
    return this.data;
  }
}
