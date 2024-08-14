import { BaseStockData } from '@/app/selectstock/types';
import { Ma } from '@ch20026103/anysis';

export default class Ma60Generate {
  ma: Ma;

  pre: any | undefined;

  data:
    | undefined
    | {
        ma60: number;
        exclusionValueMa60: {
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
      this.pre = this.ma.init(value, 60);
    } else {
      this.pre = this.ma.next(value, this.pre, 60);
    }
    this.data = {
      ma60: this.pre.ma,
      exclusionValueMa60: this.pre.exclusionValue,
    };
    return this.data;
  }
}
