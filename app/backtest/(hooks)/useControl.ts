import { useBackTest } from '@/store/zustand';
import { useState } from 'react';
import { DetailRef } from '../(components)/Cards/Action/detail';

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
    let interval: ReturnType<typeof setInterval> | null = null;
    interval = setInterval(() => {
      if (!context) return;
      const res = context.run();
      console.log(res);
      detailRef.current?.update();
      if (!res && interval) {
        clearInterval(interval);
        setIntervalID(null);
      }
    }, 300);
    setIntervalID(interval);
  };

  return { context, handleRun, handleStop, intervalId };
}
