'use client';
import { useBackTest } from '@/store/zustand';
import { CardContent, Card as MuiCard, styled } from '@mui/material';
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { useContext, useMemo, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { StatusContext } from '../../(context)/status';

// 註冊 Chart.js 的組件
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export const Card = styled(MuiCard)`
  /* 手機裝置 (螢幕寬度 480px 至 767px) */
  @media screen and (min-width: 480px) {
    grid-column: auto / span 2;
  }

  /* 平板裝置 (豎向模式，螢幕寬度 768px 至 1023px) */
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    grid-column: auto / span 3;
  }
`;

export default function CaptionLineChart() {
  const {} = useContext(StatusContext);
  const { context } = useBackTest();
  const record = useRef<number[]>([]);
  const date = useRef<number[]>([]);

  const totalDatesLen = useMemo(() => {
    const historyDatesLen = context?.dateSequence.historyDates.length || 0;
    const futureDatesLen = context?.dateSequence.futureDates.length || 0;
    return historyDatesLen + futureDatesLen;
  }, [context?.dateSequence]);

  // 設置數據和配置
  const data = useMemo(() => {
    if (!context?.dateSequence.currentDate) {
      record.current = [];
      date.current = [];
    }
    if (context?.capital && context?.dateSequence.currentDate) {
      record.current.push(context?.capital);
      date.current.push(context?.dateSequence.currentDate);
    }
    const arr = [...date.current];
    while (arr.length < totalDatesLen) {
      arr.push(-1);
    }
    return {
      labels: arr,
      datasets: [
        {
          label: 'Caption',
          data: record.current,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          fill: true,
          borderWidth: 1,
        },
      ],
    };
  }, [context?.capital, context?.dateSequence, totalDatesLen]);

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
    }),
    [],
  );

  return (
    <Card>
      <CardContent>
        <Line data={data} options={options} />
      </CardContent>
    </Card>
  );
}
