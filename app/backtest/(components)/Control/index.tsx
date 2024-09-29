'use client';
import { Button } from '@mui/material';
import { useRef } from 'react';
import useControl from '../../(hooks)/useControl';
import Detail, { DetailRef } from './detail';

export default function Control() {
  const detailRef = useRef<DetailRef>(null);

  const { context, handleRun, handleStop } = useControl(detailRef);
  if (!context) return <div>no context</div>;

  return (
    <div>
      <Button variant="outlined" size="small" onClick={handleStop}>
        Stop
      </Button>
      <Button variant="outlined" size="small" onClick={handleRun}>
        Run
      </Button>
      <Detail context={context} ref={detailRef} />
    </div>
  );
}
