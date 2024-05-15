'use client';
import { ChangeEvent, createContext, useState } from 'react';

export const SelectStockContext = createContext({
  rollback_date: 0,
  setRollbackDate: (date: number) => {},
  db_data_set: true,
  setDbDateSet: (state: boolean) => {},
});

export function SelectStockContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [rollback_date, setRollbackDate] = useState(0);
  const [db_data_set, setDbDateSet] = useState(true);

  return (
    <SelectStockContext.Provider
      value={{ rollback_date, setRollbackDate, db_data_set, setDbDateSet }}
    >
      {children}
    </SelectStockContext.Provider>
  );
}
