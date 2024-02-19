import { Suspense } from 'react';
import { fetchStockList } from './(lib)/data';
import Controller from './(ui)/controller';

export default async function Page() {
  const stocks = await fetchStockList();
  return (
    <main>
      <p>Immersive Stock Page</p>
      <Suspense fallback={'loading'}>
        <Controller stocks={stocks} />
      </Suspense>
    </main>
  );
}
