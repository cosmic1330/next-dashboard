/*
loading.tsx是一個建立在 Suspense 之上的特殊 Next.js 文件，
它允許dashboard建立備用UI 以在page頁面內容載入時替換顯示。
 */
import DashboardSkeleton from '@/app/dashboard/(ui)/skeletons';

export default function Loading() {
  return <DashboardSkeleton />;
}
