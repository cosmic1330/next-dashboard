"use client"
import { Application } from '@splinetool/runtime';
import { useEffect, useRef } from 'react';

const SplineModel = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      const model = new Application(canvas);
      model.load(
        'https://prod.spline.design/gv7wwxFGenj4Yr8j/scene.splinecode',
      );
    }

    // Cleanup function
    return () => {
      // Perform cleanup if needed
    };
  }, []);

  return <canvas ref={canvasRef}/>;
};

export default SplineModel;
