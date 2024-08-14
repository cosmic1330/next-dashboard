'use client';

import FormateDate from "@/utils/formateStrDate";
import { V2DailyDealResponse } from "../api/taiwan-stock/v2/daily_deal/[id]/route";
import BollGenerate from '@/app/selectstock/(utils)/indicator/classes/boll';
import KdGenerate from '@/app/selectstock/(utils)/indicator/classes/kd';
import Ma10Generate from '@/app/selectstock/(utils)/indicator/classes/ma10';
import Ma120Generate from '@/app/selectstock/(utils)/indicator/classes/ma120';
import Ma20Generate from '@/app/selectstock/(utils)/indicator/classes/ma20';
import Ma240Generate from '@/app/selectstock/(utils)/indicator/classes/ma240';
import Ma5Generate from '@/app/selectstock/(utils)/indicator/classes/ma5';
import Ma60Generate from '@/app/selectstock/(utils)/indicator/classes/ma60';
import MacdGenerate from '@/app/selectstock/(utils)/indicator/classes/macd';
import Obv10Generate from '@/app/selectstock/(utils)/indicator/classes/obv10';
import Obv5Generate from '@/app/selectstock/(utils)/indicator/classes/obv5';
import { createSelectedIndicators } from "../selectstock/(utils)/indicator";

export default function Page() {
  const run = async () => {
    const data: V2DailyDealResponse = await fetch(
      'http://localhost:3000/api/taiwan-stock/v2/daily_deal/1220',
    ).then((res) => res.json());
  };

  return <button onClick={run}>Run</button>;
}
