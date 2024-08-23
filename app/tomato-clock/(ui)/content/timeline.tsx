'use client';
import { Task } from '@/store/types';
import { useTaskStore } from '@/store/zustand';
import AssignmentIcon from '@mui/icons-material/AcUnit';
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from '@mui/lab';
import { Paper, Typography } from '@mui/material';
import { styled } from '@mui/system';

const MuiTimelineDot = styled(TimelineDot)`
  :hover {
    cursor: pointer;
  }
`;

function Item({
  task,
  last,
  current,
}: {
  task: Task;
  last: boolean;
  current: boolean;
}) {
  const { setCurrentTask } = useTaskStore();
  const changeCurrentTask = () => setCurrentTask(task);
  return (
    <TimelineItem>
      <TimelineOppositeContent>Task</TimelineOppositeContent>
      <TimelineSeparator>
        <MuiTimelineDot
          color={current ? 'primary' : task.finish ? 'success' : 'grey'}
          onClick={changeCurrentTask}
        >
          <AssignmentIcon />
        </MuiTimelineDot>
        {!last && <TimelineConnector />}
      </TimelineSeparator>
      <TimelineContent>
        <Paper elevation={3}>
          <Typography  variant="h6" component="h1">
            {task.name}
          </Typography>
          <Typography>{task.description}</Typography>
        </Paper>
      </TimelineContent>
    </TimelineItem>
  );
}

export default function TimeLineComponent() {
  const { currentTask, tasks } = useTaskStore();
  const render = () => {
    return (
      tasks &&
      tasks.map((task, index) => {
        if (index % 2 !== 0) {
          return (
            <Item
              key={index}
              {...{
                task,
                last: index === tasks.length - 1,
                current: currentTask?.id === task.id,
              }}
            />
          );
        } else if (index % 2 === 0) {
          return (
            <Item
              key={index}
              {...{
                task,
                last: index === tasks.length - 1,
                current: currentTask?.id === task.id,
              }}
            />
          );
        }
      })
    );
  };
  return <Timeline>{render()}</Timeline>;
}
