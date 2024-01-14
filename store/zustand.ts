import { create } from 'zustand';

type StockStore = {
  retrospect: string;
  change: (day: string) => void;
};

export const useStockStore = create<StockStore>((set) => ({
  retrospect: '0',
  change: (day: string) => set((state) => ({ retrospect: day })),
}));
