'use client';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { Context } from '@ch20026103/backtest';

export interface DetailRef {
  update: () => void;
}

interface DetailProps {
  context: Context;
}

const Detail = forwardRef<DetailRef, DetailProps>(({ context }, ref) => {
  const [, setUpdateTrigger] = useState(0);

  useImperativeHandle(ref, () => ({
    update: () => setUpdateTrigger(prev => prev + 1)
  }));

  return (
    <div>
      <h1>上下文</h1>
      <p>当前日期：{context.dateSequence.currentDate}</p>
      <p>资本：{context.capital}</p>
      <p>利润：{context.record.profit}</p>
      <p>盈利：{context.record.win}</p>
      <p>亏损：{context.record.lose}</p>
      <p>未实现利润：{context.unSoldProfit}</p>
      <pre>库存：{JSON.stringify(context.record.inventory)}</pre>
    </div>
  );
});

Detail.displayName = 'Detail';

export default Detail;
