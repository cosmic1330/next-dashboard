import { BaseStockData, BaseTaxieData } from '@/app/selectstock/types';
import { Williams } from '@ch20026103/anysis';

export default class williams18Generate {
  williams: Williams;

  pre: any | undefined;

  data:
    | undefined
    | {
        williams18: number;
      };

  constructor() {
    this.williams = new Williams();
    this.pre = undefined;
    this.data = undefined;
  }

  generate(value: BaseStockData | BaseTaxieData) {
    if (this.data === undefined) {
      this.pre = this.williams.init(value, 18);
    } else {
      this.pre = this.williams.next(value, this.pre, 18);
    }
    this.data = {
      williams18: this.pre.williams,
    };
    return this.data;
  }
}
