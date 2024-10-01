import { useBackTest } from '@/store/zustand';
import { useState } from 'react';
import { DetailRef } from '../(components)/Cards/Control/detail';

export default function useControl(detailRef: React.RefObject<DetailRef>) {
  const { context } = useBackTest();
  const [intervalId, setIntervalID] = useState<ReturnType<
    typeof setInterval
  > | null>(null);

  const handleStop = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalID(null);
    }
  };
  const handleRun = () => {
    const interval = setInterval(() => {
      if (!context) return;
      const res = context.run();
      detailRef.current?.update();
      if (!res && intervalId) clearInterval(intervalId);
    }, 300);
    setIntervalID(interval);
  };

  return { context, handleRun, handleStop, intervalId };
}
