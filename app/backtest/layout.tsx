import '@/app/(ui)/global.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Backtest',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
