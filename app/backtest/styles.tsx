import { styled } from '@mui/system';

export const Main = styled('main')`
  ::before {
    content: '';
    position: fixed;
    width: 100vw;
    height: 100vh;
    background: linear-gradient(to bottom, #bce0fa 0%, #e6e6e6 100%) fixed;
  }
`;
