'use client';
import { styled } from '@mui/system';
import { useTaskStore } from '@/store/zustand';
import {
  Box,
  Button,
  Stack,
  Snackbar,
  Alert as MuiAlert,
  ButtonGroup,
} from '@mui/material';

const Main = styled('main')`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 30px;
  gap: 10px;
`;

const ButtonArea = styled(Box)`
  padding: 10px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 5px;
  border: 1px solid #707070;
`;

const ItemArea = styled('div')`
  background-color: #707070;
  border-radius: 5px;
  padding: 5px 10px;
  color: #fff;
`;

function Item({
  children,
  ...args
}: {
  children: React.ReactNode;
  css?: string;
}) {
  return <ItemArea {...{ args }}>{children}</ItemArea>;
}

export default function Alert() {
  const { currentTask } = useTaskStore();

  const format = (s: number) => {
    let m: number = Math.floor(s / 60);
    s = s % 60;
    const minutes = `${m}`.length == 1 ? '0' + m : m;
    const seconds = `${s}`.length == 1 ? '0' + s : s;

    return minutes + ':' + seconds;
  };

  return (
    <Main>
      <ButtonArea>
        <ButtonGroup color="primary" aria-label="medium secondary button group">
          <Button variant="contained" key="start">
            Start
          </Button>
          <Button variant="contained" key="pause">
            Pause
          </Button>
          <Button variant="contained" key="restart">
            Restart
          </Button>
        </ButtonGroup>
      </ButtonArea>

      <ButtonArea>
        <Stack direction="row" spacing={2}>
          <div>
            任務： <Item>{currentTask?.name}</Item>
          </div>
          <div>
            時間：<Item>{0}</Item>
          </div>
        </Stack>
      </ButtonArea>

      <Snackbar
        open={true}
        autoHideDuration={6000}
        onClose={close}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MuiAlert variant="filled" severity="success">
          {currentTask?.description}
        </MuiAlert>
      </Snackbar>
    </Main>
  );
}
