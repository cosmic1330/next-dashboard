import { BaseStockData, BaseTaxieData } from '@/app/selectstock/types';
import { Williams } from '@ch20026103/anysis';

export default class williams8Generate {
  williams: Williams;

  pre: any | undefined;

  data:
    | undefined
    | {
        williams8: number;
      };

  constructor() {
    this.williams = new Williams();
    this.pre = undefined;
    this.data = undefined;
  }

  generate(value: BaseStockData | BaseTaxieData) {
    if (this.data === undefined) {
      this.pre = this.williams.init(value, 8);
    } else {
      this.pre = this.williams.next(value, this.pre, 8);
    }
    this.data = {
      williams8: this.pre.williams,
    };
    return this.data;
  }
}
