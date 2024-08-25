import { BaseStockData, BaseTaxieData } from '@/app/selectstock/types';
import { Ma } from '@ch20026103/anysis';

export default class Ma5Generate {
  ma: Ma;

  pre: any | undefined;

  data:
    | undefined
    | {
        ma5: number;
        exclusionValueMa5: {
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

  generate(value: BaseStockData | BaseTaxieData) {
    if (this.data === undefined) {
      this.pre = this.ma.init(value, 5);
    } else {
      this.pre = this.ma.next(value, this.pre, 5);
    }
    this.data = {
      ma5: this.pre.ma,
      exclusionValueMa5: this.pre.exclusionValue,
    };
    return this.data;
  }
}
