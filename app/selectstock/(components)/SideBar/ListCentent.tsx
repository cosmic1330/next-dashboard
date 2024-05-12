import NotificationImportantSharpIcon from '@mui/icons-material/NotificationImportantSharp';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import { Box } from '@mui/material';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { ListItemButton } from './styles';
import { useSelectPlan } from '@/store/zustand';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';


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
      <ListItemButton
        selected={plan === 0}
        onClick={(event) => handleListItemClick(event, 0)}
      >
        <Box>
          <ListItemIcon>
            <ShoppingCartIcon />
          </ListItemIcon>
          <ListItemText primary="Cache Plan" />
        </Box>
      </ListItemButton>
      <ListItemButton
        selected={plan === 1}
        onClick={(event) => handleListItemClick(event, 1)}
      >
        <Box>
          <ListItemIcon>
            <NotificationImportantSharpIcon />
          </ListItemIcon>
          <ListItemText primary="Python Plan" />
        </Box>
      </ListItemButton>

      <ListItemButton
        selected={plan === 2}
        onClick={(event) => handleListItemClick(event, 2)}
      >
        <Box>
          <ListItemIcon>
            <StarRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Forward Plan" />
        </Box>
      </ListItemButton>

      <ListItemButton
        selected={plan === 3}
        onClick={(event) => handleListItemClick(event, 3)}
      >
        <Box>
          <ListItemIcon>
            <NoteAddOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Tracking Table" />
        </Box>
      </ListItemButton>
    </List>
  );
}
