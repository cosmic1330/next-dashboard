import {
  Drawer,
  Divider as MuiDivider,
  ListItemButton as MuiListItemButton,
  Stack,
  styled,
} from '@mui/material';
import { yellow } from '@mui/material/colors';

export const StyledDrawer = styled(Drawer)`
  .MuiDrawer-paper {
    margin: 15px;
    box-sizing: border-box;
    height: calc(100vh - 30px);
    border-radius: 10px;
    transition: 0.5s;
    width: ${(props) => (props.open ? '240px' : '60px')};
    background-color: ${(props) => props.theme.palette.primary.dark};
    padding: ${(props) => (props.open ? '20px 10pxx' : '0')};
    color: #fff;
    position: unset;
    ::-webkit-scrollbar {
      display: none;
    }
  }
`;

export const Divider = styled(MuiDivider)`
  border-top: 0px solid rgba(0, 0, 0, 0.08);
  border-right: 0px solid rgba(0, 0, 0, 0.08);
  border-left: 0px solid rgba(0, 0, 0, 0.08);
  border-bottom: none;
  height: 0.0625rem;
  margin: 1rem 0px;
  background-image: linear-gradient(
    to right,
    rgba(255, 255, 255, 0),
    rgb(255, 255, 255),
    rgba(255, 255, 255, 0)
  );
`;
export const StyledHeader = styled(Stack)`
  white-space: nowrap;
  font-size: 24px;
  margin-top: 20px;
  font-weight: 500;
`;
export const ListItemButton = styled(MuiListItemButton)`
  padding-top: 2px;
  padding-bottom: 2px;
  .MuiBox-root {
    width: 100%;
    border-radius: 5px;
    margin: auto;
    background-color: ${(props) =>
      props.selected && props.theme.palette.primary.dark};
    padding: 2px;
    display: flex;
    align-items: center;
    color: ${(props) => (props.selected ? yellow[500] : '#fff')};
    .MuiSvgIcon-root {
      color: ${(props) => (props.selected ? yellow[500] : '#fff')};
    }
  }
`;
