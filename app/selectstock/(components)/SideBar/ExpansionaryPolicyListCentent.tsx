import { useSelectPlan } from '@/store/zustand';
import MultilineChartRounded from '@mui/icons-material/MultilineChartRounded';
import ScienceIcon from '@mui/icons-material/Science';
import PresentToAll from '@mui/icons-material/PresentToAll';
import { Box } from '@mui/material';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { ListItemButton } from './styles';
const li = [
  {
    icon: PresentToAll,
    text: 'V1 Plans',
  },
  {
    icon: ScienceIcon,
    text: 'Experiment Plan',
  },
  {
    icon: MultilineChartRounded,
    text: 'Muti Condition Plan',
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
