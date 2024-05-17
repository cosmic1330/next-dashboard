import { useSelectPlan } from '@/store/zustand';
import AdsClickIcon from '@mui/icons-material/AdsClick';
import CachedIcon from '@mui/icons-material/Cached';
import CallMissedOutgoingIcon from '@mui/icons-material/CallMissedOutgoing';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import InsightsIcon from '@mui/icons-material/Insights';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import { Box } from '@mui/material';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { ListItemButton } from './styles';
const li = [
  {
    icon: CachedIcon,
    text: 'Cache Plan',
  },
  {
    icon: LibraryAddCheckIcon,
    text: 'Two Red Soldier Plan',
  },
  {
    icon: InsightsIcon,
    text: 'Forward Plan',
  },
  {
    icon: FileUploadIcon,
    text: 'Breakthrough Pressure Table',
  },
  {
    icon: AdsClickIcon,
    text: 'KD Bottom Flip Table',
  },
  {
    icon: CallMissedOutgoingIcon,
    text: 'Back Support Line Table',
  },
];

export default function SlopeListCentent() {
  const { change, plan } = useSelectPlan();

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
  ) => {
    change(index);
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
