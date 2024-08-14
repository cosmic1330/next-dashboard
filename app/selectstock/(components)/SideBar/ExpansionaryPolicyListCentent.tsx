import { useSelectPlan } from '@/store/zustand';
import DeblurIcon from '@mui/icons-material/Deblur';
import ScienceIcon from '@mui/icons-material/Science';
import WidthWideIcon from '@mui/icons-material/WidthWide';
import { Box } from '@mui/material';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { ListItemButton } from './styles';
const li = [
  {
    icon: DeblurIcon,
    text: 'Obv Long Plan',
  },
  {
    icon: WidthWideIcon,
    text: 'Wide Ranging Plan',
  },
  {
    icon: ScienceIcon,
    text: 'Experiment Plan',
  },
];

export default function ExpansionaryPolicyListCentent() {
  const { change, plan } = useSelectPlan();

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
  ) => {
    change(index + 201);
  };

  return (
    <List component="nav" aria-label="main mailbox folders">
      {li.map((item, index) => (
        <ListItemButton
          key={index}
          selected={plan === index + 201}
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
