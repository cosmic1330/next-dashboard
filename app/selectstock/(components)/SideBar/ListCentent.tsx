import { useSelectPlan } from '@/store/zustand';
import AdsClickIcon from '@mui/icons-material/AdsClick';
import CallMissedOutgoingIcon from '@mui/icons-material/CallMissedOutgoing';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import InsightsIcon from '@mui/icons-material/Insights';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import { Box } from '@mui/material';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { ListItemButton } from './styles';
const li = [
  {
    icon: MoreTimeIcon,
    text: 'Cache Plan',
  },
  {
    icon: LibraryAddCheckIcon,
    text: 'Python Plan',
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
  {
    icon: NoteAddOutlinedIcon,
    text: 'Tracking Table',
  },
];

export default function ListCentent() {
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
