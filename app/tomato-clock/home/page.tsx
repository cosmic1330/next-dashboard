'use client';
import { useTaskStore } from '@/store/zustand';
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Stack,
  TextField,
  Typography,
  styled,
} from '@mui/material';
import Link from 'next/link';
import { InputHTMLAttributes, useRef } from 'react';
import Content from '../(ui)/content';

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

const FixBox = styled(Box)`
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: space-around;
  padding: 10px;
  bottom: 0;
`;

function Page1() {
  return (
    <div className="relative flex h-full w-full snap-center flex-col items-center justify-between rounded-[2.4rem] bg-gradient-to-r from-sky-500 to-indigo-500 bg-cover bg-center">
      <div className="flex w-full flex-col items-center">
        <Typography variant="subtitle1" color="common.white">
          任務總完成時數
        </Typography>
        <Box mb={2}>
          <Typography component="span" variant="h4" color="common.white">
            5
          </Typography>
          <Typography mx={1} component="span" variant="h6" color="common.white">
            小時
          </Typography>
          <Typography component="span" variant="h4" color="common.white">
            25
          </Typography>
          <Typography mx={1} component="span" variant="h6" color="common.white">
            分鐘
          </Typography>
        </Box>
        <div className="mb-3 min-w-[90%] rounded-md bg-slate-800 p-3 text-xs text-white opacity-60">
          <Typography variant="subtitle2" color="common.white">
            下一個任務
          </Typography>
          <ul>
            <li className="flex items-center justify-between py-2">
              <Typography variant="body2" color="common.white">
                斷食168
              </Typography>
              <Button variant="text" size="small" color="info">
                開始
              </Button>
            </li>
            <Divider className="bg-white" />
          </ul>
        </div>
        <div className="mb-3 min-w-[90%] rounded-md bg-slate-800 p-3 text-xs text-white opacity-60">
          <Typography variant="subtitle2" color="common.white" align="center">
            統計
          </Typography>
        </div>
        <FixBox>
          <Link href="/tomato-clock" passHref>
            <Button variant="contained">退出</Button>
          </Link>
          <Button variant="contained">新增</Button>
        </FixBox>
      </div>
    </div>
  );
}

function Page2() {
  return (
    <div className="flex h-full w-full snap-center flex-col items-center justify-between rounded-[2.4rem] bg-gradient-to-r from-sky-500 to-indigo-500 bg-cover bg-center">
      <div className="flex h-full w-full flex-col items-center justify-center gap-10">
        <Content />
      </div>
    </div>
  );
}

function Page3() {
  const { increment } = useTaskStore();
  const nameRef = useRef<InputHTMLAttributes<HTMLInputElement>>();
  const descriptionRef = useRef<InputHTMLAttributes<HTMLInputElement>>();

  const handleClick = () => {
    let newTask = {
      name: nameRef.current?.value as string,
      description: descriptionRef.current?.value as string,
      workTime: 25 * 60 * 1000,
      relaxTime: 5 * 60 * 1000,
      finish: false,
    };
    increment(newTask);
  };
  return (
    <div className="h-full w-full snap-center  rounded-[2.4rem] bg-gradient-to-r from-sky-500 to-indigo-500 bg-cover bg-center">
      <Stack py={4} px={2} gap={2}>
        <TextField label="Task Name" variant="outlined" inputRef={nameRef} />
        <FormGroup>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Today"
            disabled
          />
        </FormGroup>
        <TextField
          label="Description in here"
          variant="outlined"
          inputRef={descriptionRef}
        />
        <Button variant="contained" color="primary" onClick={handleClick}>
          Save
        </Button>
      </Stack>
    </div>
  );
}

export default function Pages() {
  return (
    <div className="h-full w-full overflow-hidden">
      <Scroll className="h-full w-full snap-x snap-mandatory overflow-x-scroll scroll-smooth">
        <div className="grid h-full w-[500%] grid-cols-5">
          <div className="h-full w-full">
            <Page3 />
          </div>
          <div className="h-full w-full"></div>
          <div className="h-full w-full">
            <Page2 />
          </div>
          <div className="h-full w-full"></div>
          <div className="h-full w-full">
            <Page3 />
          </div>
        </div>
      </Scroll>
    </div>
  );
}
