'use client';

import { useStockStore } from '@/store/zustand';

export default function Range() {
  const { change, retrospect } = useStockStore();
  const habdleChange = (e: any) => {
    change(e.target?.value);
  };
  return (
    <div>
        <input type='text' value={retrospect} onChange={habdleChange} />
        <input
          type="range"
          min="-100" max="0" step="1"
          value={retrospect}
          onChange={habdleChange}
        />
    </div>
  );
}
