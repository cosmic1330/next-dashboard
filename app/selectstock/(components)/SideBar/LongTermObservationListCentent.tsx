import { useSelectPlan } from '@/store/zustand';
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import { Box } from '@mui/material';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { ListItemButton } from './styles';
const li = [
  {
    icon: MoreTimeIcon,
    text: 'Kd Divergence Plan',
  },
];

export default function LongTermObservationListCentent() {
  const { change, plan } = useSelectPlan();

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
  ) => {
    change(index + 101);
  };

  return (
    <List component="nav" aria-label="main mailbox folders">
      {li.map((item, index) => (
        <ListItemButton
          key={index}
          selected={plan === index + 101}
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
