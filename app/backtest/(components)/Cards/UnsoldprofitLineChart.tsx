'use client';
import { useBackTest } from '@/store/zustand';
import { CardContent, Card as MuiCard, styled } from '@mui/material';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import { useContext, useMemo, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import { StatusContext } from '../../(context)/status';

// 註冊 Chart.js 的組件
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
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

export default function UnsoldprofitLineChart() {
  const {} = useContext(StatusContext);
  const { context } = useBackTest();
  const record = useRef<number[]>([]);
  const date = useRef<number[]>([]);

  // 設置數據和配置
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
    if (context?.unSoldProfit && context?.dateSequence.currentDate) {
      record.current.push(context?.unSoldProfit);
      date.current.push(context?.dateSequence.currentDate);
    }
    const arr = [...date.current];
    while (arr.length < totalDatesLen) {
      arr.push(-1);
    }

    // Dynamically set colors based on profit value
    const backgroundColor = record.current.map((profit) =>
      profit < 0 ? 'rgba(255, 99, 132, 0.8)' : 'rgba(75, 192, 192, 0.8)',
    );

    return {
      labels: arr,
      datasets: [
        {
          label: 'UnSold Profit',
          data: record.current,
          backgroundColor: backgroundColor,
        },
      ],
    };
  }, [context?.unSoldProfit]);

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
        <Bar data={data} options={options} />
      </CardContent>
    </Card>
  );
}
