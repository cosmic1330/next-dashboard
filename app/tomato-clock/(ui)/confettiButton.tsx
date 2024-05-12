import { styled } from '@mui/system';
import { Button  } from '@mui/material';
import { useRef } from 'react';
import confetti from 'canvas-confetti';

export default function ConfettiButton({children}: {children: React.ReactNode}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const createCanvas = () => {
    confetti({
      particleCount: 100,
      spread: 60,
      origin: { y: 0.5 },
    });
  };
  return <Button onClick={createCanvas}>{children}</Button>;
}
