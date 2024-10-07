'use client';
import useControl from '@/app/backtest/(hooks)/useControl';
import { Button, Card, CardContent, Typography } from '@mui/material';
import { useRef } from 'react';
import Detail, { DetailRef } from './detail';

export default function Action() {
  const detailRef = useRef<DetailRef>(null);

  const { context, handleRun, handleStop, intervalId } = useControl(detailRef);
  if (!context) return <div>no context</div>;

  return (
    <Card>
      <CardContent>
        <Typography variant="subtitle1" color="ActiveBorder" gutterBottom>
          Action
        </Typography>
        {intervalId ? (
          <Button variant="outlined" size="small" onClick={handleStop}>
            Stop
          </Button>
        ) : (
          <Button variant="outlined" size="small" onClick={handleRun}>
            Run
          </Button>
        )}
        <Detail context={context} ref={detailRef} />
      </CardContent>
    </Card>
  );
}
