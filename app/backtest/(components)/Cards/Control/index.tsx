'use client';
import useControl from '@/app/backtest/(hooks)/useControl';
import { Button, Card, CardContent } from '@mui/material';
import { useRef } from 'react';
import Detail, { DetailRef } from './detail';

export default function Control() {
  const detailRef = useRef<DetailRef>(null);

  const { context, handleRun, handleStop, intervalId } = useControl(detailRef);
  if (!context) return <div>no context</div>;

  return (
    <Card sx={{gridColumn:"1/span 2"}}>
      <CardContent>
        {intervalId ? (
          <Button variant="outlined" size="small" onClick={handleStop}>
            Stop
          </Button>
        ) : (
          <Button variant="outlined" size="small" onClick={handleRun}>
            Run
          </Button>
        )}
      </CardContent>
      <Detail context={context} ref={detailRef} />
    </Card>
  );
}
