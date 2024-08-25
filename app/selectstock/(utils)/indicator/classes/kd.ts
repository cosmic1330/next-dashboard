import { BaseStockData, BaseTaxieData } from '@/app/selectstock/types';
import { Kd } from '@ch20026103/anysis';

export default class KdGenerate {
  kd: Kd;

  pre: any | undefined;

  data:
    | undefined
    | {
        rsv: number | null;
        k: number | null;
        d: number | null;
        'k-d': number | null;
      };

  constructor() {
    this.kd = new Kd();
    this.pre = undefined;
    this.data = undefined;
  }

  generate(value: BaseStockData | BaseTaxieData) {
    if (this.data === undefined) {
      this.pre = this.kd.init(value);
    } else {
      this.pre = this.kd.next(value, this.pre, 9);
    }
    this.data = {
      rsv: this.pre.rsv,
      k: this.pre.k,
      d: this.pre.d,
      'k-d': this.pre['k-d'],
    };
    return this.data;
  }
}
