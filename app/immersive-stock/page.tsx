import { Suspense } from 'react';
import { fetchStockList } from './(lib)/data';
import Content from './(ui)/content';

export default async function Page() {
  const stocks = await fetchStockList();
  return (
    <main>
      <p>Immersive Stock Page</p>
      <Suspense fallback={'loading'}>
        <Content stocks={stocks} />
      </Suspense>
    </main>
  );
}
