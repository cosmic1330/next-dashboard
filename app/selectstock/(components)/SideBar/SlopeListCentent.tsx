import { useSelectPlan } from '@/store/zustand';
// import AdsClickIcon from '@mui/icons-material/AdsClick';
import CallMissedOutgoingIcon from '@mui/icons-material/CallMissedOutgoing';
// import FileUploadIcon from '@mui/icons-material/FileUpload';
// import InsightsIcon from '@mui/icons-material/Insights';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
// import UnfoldMoreDoubleIcon from '@mui/icons-material/UnfoldMoreDouble';
// import WidthWideIcon from '@mui/icons-material/WidthWide';
// import MoneyIcon from '@mui/icons-material/Money';
import AllOutIcon from '@mui/icons-material/AllOut';
import { Box } from '@mui/material';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { ListItemButton } from './styles';

const li = [
  {
    icon: AllOutIcon,
    text: 'Generalized Plan',
  },
  {
    icon: LibraryAddCheckIcon,
    text: 'V2 Plans',
  },
  {
    icon: CallMissedOutgoingIcon,
    text: 'Sara Plans',
  },
];

export default function SlopeListCentent() {
  const { change, plan } = useSelectPlan();

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
  ) => {
    change(index + 1);
  };

  return (
    <List component="nav" aria-label="main mailbox folders">
      {li.map((item, index) => (
        <ListItemButton
          key={index}
          selected={plan === index + 1}
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
