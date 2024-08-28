import { useSelectPlan } from '@/store/zustand';
import AirlineStopsIcon from '@mui/icons-material/AirlineStops';
import DeblurIcon from '@mui/icons-material/Deblur';
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import Upcoming from '@mui/icons-material/Upcoming';
import { Box } from '@mui/material';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { ListItemButton } from './styles';

const li = [
  {
    icon: MoreTimeIcon,
    text: 'Macd Trend Reversal Plan',
  },
  {
    icon: DeblurIcon,
    text: 'Uptrend Continuation Plan',
  },
  {
    icon: Upcoming,
    text: 'Held Support Line Plan',
  },
  {
    icon: AirlineStopsIcon,
    text: 'Williams Negative Trend Plan',
  },
];

export default function BearishToBullishListCentent() {
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
