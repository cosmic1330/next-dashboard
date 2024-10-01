import { styled } from '@mui/system';

export const Main = styled('main')`
  display: grid;
  min-height: 100vh;
  grid-template-areas:
    'sidebar header'
    'sidebar content';
  grid-template-columns: 60px 1fr;
  grid-template-rows: auto 1fr;
  ::before {
    content: '';
    z-index: -1;
    position: fixed;
    width: 100vw;
    height: 100vh;
    background: linear-gradient(to bottom, #bce0fa 0%, #e6e6e6 100%) fixed;
  }
`;

export const Header = styled('div')`
  grid-area: header;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

export const Sidebar = styled('div')`
  grid-area: sidebar;
  display: grid;
  grid-auto-rows: 60px;
`;

export const Content = styled('div')`
  grid-area: content;
  display: grid;
  grid-auto-flow: row dense;
  grid-gap: 10px;
  padding: 20px;
  grid-auto-rows: min-content;
  grid-template-columns: 1fr;

  /* 手機裝置 (螢幕寬度 480px 至 767px) */
  @media screen and (min-width: 480px) and (max-width: 767px) {
    grid-template-columns: 1fr 1fr;
  }
  /* 平板裝置 (豎向模式，螢幕寬度 768px 至 1023px) */
  @media screen and (min-width: 768px) and (max-width: 1023px){
    grid-template-columns: 1fr 1fr 1fr;
  }
  /* 平板裝置 (橫向模式，螢幕寬度 1024px 至 1199px) */
  @media screen and (min-width: 1024px) and (max-width: 1199px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  /* 桌機裝置 (螢幕寬度 1200px 以上) */
  @media screen and (min-width: 1200px) {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  }
`;
