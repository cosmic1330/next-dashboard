'use client';

import { styled } from '@mui/system';

const Main = styled('div')`
  width: 100%;
  height: 100vh;
  background: url('/nasa.jpg') no-repeat fixed;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
`;

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Main>
      <h1 className="font-mono text-[50px] text-white my-3">Clock</h1>
      <div className="border-box relative flex aspect-[10/20] h-4/5 items-center justify-center rounded-[3rem] border border-blue-300 bg-gradient-to-b from-blue-100 to-blue-200 p-[0.2rem] shadow-[1rem_1rem_6rem_rgba(0,0,0,0.4),0_0_0.1rem_rgba(0,0,0,0.4)]">
        <div className="absolute -right-1 top-[30%] h-20 w-1 rounded-[0_0.1rem_0.1rem_0] border-r border-blue-100 bg-gradient-to-r from-neutral-400 via-blue-300 to-blue-300 shadow-[2px_0_1px_rgba(0,0,0,0.2)_inset]"></div>
        <div className="absolute -left-1 top-[38%] h-10 w-1 rounded-[0_0.1rem_0.1rem_0] border-l border-blue-100 bg-gradient-to-l from-neutral-400 via-blue-300 to-blue-300 shadow-[2px_0_1px_rgba(0,0,0,0.2)_inset]"></div>
        <div className="absolute -left-1 top-[28%] h-10 w-1 rounded-[0_0.1rem_0.1rem_0] border-l border-blue-100 bg-gradient-to-l from-neutral-400 via-blue-300 to-blue-300 shadow-[2px_0_1px_rgba(0,0,0,0.2)_inset]"></div>
        <div className="absolute -left-1 top-[20%] h-5 w-1 rounded-[0_0.1rem_0.1rem_0] border-l border-blue-100 bg-gradient-to-l from-neutral-400 via-blue-300 to-blue-300 shadow-[2px_0_1px_rgba(0,0,0,0.2)_inset]"></div>

        <div className="border-box flex h-full w-full items-center justify-center rounded-[2.9rem] bg-black p-[0.5rem]">
          {children}
        </div>
      </div>
    </Main>
  );
}
