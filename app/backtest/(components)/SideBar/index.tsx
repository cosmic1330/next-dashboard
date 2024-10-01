import AcUnitIcon from '@mui/icons-material/AcUnit';
import SpeedIcon from '@mui/icons-material/Speed';
import { IconButton } from '@mui/material';
import { Sidebar as StyleSideBar } from '../../styles';
export default function SideBar() {
  return (
    <StyleSideBar>
      <SpeedIcon
        color="primary"
        sx={{
          placeSelf: 'center center',
          fontSize: '50px',
        }}
      />

      <IconButton
        color="inherit"
        sx={{
          placeSelf: 'center center',
        }}
      >
        <AcUnitIcon />
      </IconButton>
      <IconButton
        color="inherit"
        sx={{
          placeSelf: 'center center',
        }}
      >
        <AcUnitIcon />
      </IconButton>
      <IconButton
        color="inherit"
        sx={{
          placeSelf: 'center center',
        }}
      >
        <AcUnitIcon />
      </IconButton>
      <IconButton
        color="inherit"
        sx={{
          placeSelf: 'center center',
        }}
      >
        <AcUnitIcon />
      </IconButton>
    </StyleSideBar>
  );
}
