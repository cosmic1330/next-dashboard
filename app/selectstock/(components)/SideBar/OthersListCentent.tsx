import { useSelectPlan } from '@/store/zustand';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import { Box } from '@mui/material';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { ListItemButton } from './styles';
const li = [
  {
    icon: NoteAddOutlinedIcon,
    text: 'Tracking Table',
  },
];

export default function OthersListCentent() {
  const { change, plan } = useSelectPlan();

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
  ) => {
    change(index + 300);
  };

  return (
    <List component="nav" aria-label="main mailbox folders">
      {li.map((item, index) => (
        <ListItemButton
          key={index}
          selected={plan === index}
          onClick={(event) => handleListItemClick(event, index)}
        >
          <Box>
            <ListItemIcon>
              <item.icon />
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </Box>
        </ListItemButton>
      ))}
    </List>
  );
}
