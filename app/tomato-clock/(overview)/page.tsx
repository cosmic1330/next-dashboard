'use client';

import { Button, styled } from '@mui/material';
import Link from 'next/link';
import useClocks from '../(hooks)/useClocks';
import AppleClock from '../(ui)/clock';
import Button2 from '../(ui)/confettiButton';
import { FireIcon } from '@heroicons/react/24/outline';

const Scroll = styled('div')`
  ::-webkit-scrollbar {
    width: 0px; /* 調整滾動條的寬度 */
    height: 0px;
  }

  ::-webkit-scrollbar-track {
    background-color: transparent; /* 將滾動條軌道的背景色設置為透明 */
  }

  ::-webkit-scrollbar-thumb {
    background-color: transparent; /* 將滾動條的滑塊背景色設置為透明 */
    border-radius: 0px; /* 可選：設置圓角 */
    border: 0px solid transparent; /* 可選：設置邊框 */
  }
`;

const AppWrapper = styled('div')`
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
  grid-row-gap: 30px;
  justify-content: center;
  text-align: center;
  margin-top: 8px;
  width: 80%;
`;
function Page1({ hours, minutes }: { hours: string; minutes: string }) {
  return (
    <div className="flex h-full w-full snap-center flex-col items-center justify-between rounded-[2.4rem] bg-[url('https://farm5.staticflickr.com/4520/38665193276_43149e7cb0_o_d.jpg')] bg-cover bg-center">
      <div className="flex flex-col items-center">
        <span className="text-md mt-8 font-[Inter] font-normal text-white opacity-60">
          Friday, August 12
        </span>
        <span className="font-[Inter] text-4xl font-bold tracking-tighter text-white opacity-60 md:text-7xl">
          {hours}:{minutes}
        </span>
      </div>
      <span className="mb-2 text-xs text-white opacity-60">
        Swipe up to unlock
      </span>
      <div className="flex w-full flex-col items-center">
        <div className="mb-8 h-[0.2rem] w-[5rem] rounded-full bg-black bg-white opacity-60"></div>
      </div>
    </div>
  );
}

function Page2({ date }: { date: Date }) {
  return (
    <div className="flex h-full w-full snap-center flex-col items-center justify-between rounded-[2.4rem] bg-[url('https://farm5.staticflickr.com/4520/38665193276_43149e7cb0_o_d.jpg')] bg-cover bg-center">
      <div className="flex h-full w-full flex-col items-center justify-center gap-10">
        <div className="aspect-[2/2] w-[80%] ">
          <AppleClock {...{ date }} />
        </div>
        <AppWrapper>
          <div className="app-icon">
            <Link href="/tomato-clock/create" passHref>
              <div className="rounded-lg bg-blue-200 p-2">
                <FireIcon className="text-white" />
              </div>
              <span className="font-mono text-xs text-white">test</span>
            </Link>
          </div>
        </AppWrapper>
        <Button2>Yes</Button2>
      </div>
    </div>
  );
}

export default function Pages() {
  const { hours, minutes, date } = useClocks();

  return (
    <div className="h-full w-full overflow-hidden">
      <Scroll className="h-full w-full snap-y snap-mandatory overflow-y-scroll scroll-smooth">
        <Page1 {...{ hours, minutes }} />
        <div className="h-full w-full"></div>
        <Page2 {...{ date }} />
      </Scroll>
    </div>
  );
}
