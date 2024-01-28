import { lusitana } from '@/app/(ui)/fonts';
import { fetchCardData, fetchLatestInvoices } from '@/app/dashboard/(lib)/data';
import { Card } from '@/app/dashboard/(ui)/dashboard/cards';
import LatestInvoices from '@/app/dashboard/(ui)/dashboard/latest-invoices';
import RevenueChart from '@/app/dashboard/(ui)/dashboard/revenue-chart';
import SessionDataProvider from '@/app/dashboard/(ui)/session/provider';
import { RevenueChartSkeleton } from '@/app/dashboard/(ui)/skeletons';
import { Suspense } from 'react';
/*
Server Components 無法使用 props、state、event listeners 
(ex: onClick(), onChange() 等等 ) 
或像是 useState、useEffect、useReducer 等 React hooks。

Server Component 要注意：
1.資料請求正在無意中創建瀑布。
2.儀表板是靜態的，因此任何資料更新都不會反映在您的應用程式上。
*/
export default async function Page() {
  const latestInvoices = await fetchLatestInvoices();

  const {
    numberOfInvoices,
    numberOfCustomers,
    totalPaidInvoices,
    totalPendingInvoices,
  } = await fetchCardData();

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Collected" value={totalPaidInvoices} type="collected" />
        <Card title="Pending" value={totalPendingInvoices} type="pending" />
        <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
        <Card
          title="Total Customers"
          value={numberOfCustomers}
          type="customers"
        />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>
        <LatestInvoices latestInvoices={latestInvoices} />
      </div>
      <SessionDataProvider />
    </main>
  );
}
