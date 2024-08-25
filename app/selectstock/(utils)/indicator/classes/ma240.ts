import { BaseStockData, BaseTaxieData } from '@/app/selectstock/types';
import { Ma } from '@ch20026103/anysis';

export default class Ma240Generate {
  ma: Ma;

  pre: any | undefined;

  data:
    | undefined
    | {
        ma240: number;
        exclusionValueMa240: {
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
      this.pre = this.ma.init(value, 240);
    } else {
      this.pre = this.ma.next(value, this.pre, 240);
    }
    this.data = {
      ma240: this.pre.ma,
      exclusionValueMa240: this.pre.exclusionValue,
    };
    return this.data;
  }
}
