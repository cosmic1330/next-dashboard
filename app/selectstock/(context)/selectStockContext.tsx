'use client';
import { createContext, useState } from 'react';

export const SelectStockContext = createContext({
  volume: 500,
  setVolume: (volume: number) => {},
  rollback_date: 0,
  setRollbackDate: (date: number) => {},
  stock_db_data_set: true,
  setStockDbDateSet: (state: boolean) => {},
  daily_db_data_set: true,
  setDailyDbDateSet: (state: boolean) => {},
  useDExclusionValue: true,
  setUseDExclusionValue: (state: boolean) => {},
});

export function SelectStockContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [rollback_date, setRollbackDate] = useState(0);
  const [stock_db_data_set, setStockDbDateSet] = useState(true);
  const [daily_db_data_set, setDailyDbDateSet] = useState(true);
  const [useDExclusionValue, setUseDExclusionValue] = useState(true);
  const [volume, setVolume] = useState(500);

  return (
    <SelectStockContext.Provider
      value={{
        volume,
        setVolume,
        rollback_date,
        setRollbackDate,
        stock_db_data_set,
        setStockDbDateSet,
        daily_db_data_set,
        setDailyDbDateSet,
        useDExclusionValue,
        setUseDExclusionValue,
      }}
    >
      {children}
    </SelectStockContext.Provider>
  );
}
