'use client';
import { styled } from '@mui/system';
import { Paper, Typography } from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from '@mui/lab';
import { useTaskStore } from '@/store/zustand';
import { Task } from '@/store/types';
import AssignmentIcon from '@mui/icons-material/AcUnit';

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
      <TimelineOppositeContent>
        <Typography pl={2} variant="body2" color="textSecondary">
          {task.time}
        </Typography>
      </TimelineOppositeContent>
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
          <Typography pl={2} variant="h6" component="h1">
            {task.name}
          </Typography>
          <Typography pl={2}>{task.description}</Typography>
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
