'use client';
import { createContext, Dispatch, SetStateAction, useState } from 'react';

type Values = {
  setUpdateTrigger?: Dispatch<SetStateAction<number>>;
};

export const StatusContext = createContext<Values>({});

export function StatusContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [, setUpdateTrigger] = useState(0);

  return (
    <StatusContext.Provider
      value={{
        setUpdateTrigger,
      }}
    >
      {children}
    </StatusContext.Provider>
  );
}
