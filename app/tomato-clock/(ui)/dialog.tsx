import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/system';
import Button from '@mui/material/Button';
import { useRef, useEffect, InputHTMLAttributes } from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useTaskStore } from '@/store/zustand';

const MuiDialog = styled(Dialog)`
  .MuiPaper-root {
    padding: 20px;
    width: 400px;
  }
`;
function DialogComponent({
  open,
  handleCloseDialog,
  ...props
}: {
  open: boolean;
  handleCloseDialog: () => void;
}) {
  const { increment } = useTaskStore();
  const nameRef = useRef<InputHTMLAttributes<HTMLInputElement>>();
  const timeRef = useRef<InputHTMLAttributes<HTMLInputElement>>();
  const descriptionRef = useRef<InputHTMLAttributes<HTMLInputElement>>();

  const handleClick = () => {
    let newTask = {
      name: nameRef.current?.value as string,
      time: timeRef.current?.value  as string,
      description: descriptionRef.current?.value  as string,
      finish: false,
    };
    increment(newTask);
    handleCloseDialog();
  };

  // Speech Recognition
  useEffect(() => {}, []);
  return (
    <MuiDialog onClose={handleCloseDialog} open={open}>
      <DialogTitle>Set Task</DialogTitle>
      <TextField
        label="Task name in here"
        variant="outlined"
        inputRef={nameRef}
      />
      <br />
      <TextField
        label="Time in here"
        variant="outlined"
        inputRef={timeRef}
        placeholder={'2021-03-22 19:00'}
      />
      <FormGroup>
        <FormControlLabel
          control={<Checkbox defaultChecked />}
          label="Today"
          disabled
        />
      </FormGroup>
      <br />
      <TextField
        label="Description in here"
        variant="outlined"
        inputRef={descriptionRef}
      />
      <br />
      <Button variant="contained" color="primary" onClick={handleClick}>
        Save
      </Button>
    </MuiDialog>
  );
}

export default DialogComponent;
