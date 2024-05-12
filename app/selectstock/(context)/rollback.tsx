"use client"
import { createContext, useState } from 'react';

export const RollbackDateContext = createContext({
  rollback_date: 0,
  setRollbackDate: (date: number) => {},
});

export function RollbackDateContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [rollback_date, setRollbackDate] = useState(0);
  return (
    <RollbackDateContext.Provider value={{ rollback_date, setRollbackDate }}>
      {children}
    </RollbackDateContext.Provider>
  );
}
