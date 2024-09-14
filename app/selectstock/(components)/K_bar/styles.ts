import { Box, styled } from '@mui/material';

export type BarProps = {
  l: number;
  h: number;
  o: number;
  c: number;
  upper: number;
  lower: number;
  ma5?: number;
};

export const Bar = styled(Box)<BarProps>(({ l, h, o, c, upper, lower }) => `
  width: 15px;
  height: 150px;
  position: relative;
  border: 1px solid white;
  background-image: linear-gradient(to right, white 100%, rgba(255, 255, 255, 0) 0%);
  background-size: 100% 1px; /* 控制虛線的長度與間隔 */
  background-position: center;
  background-repeat: no-repeat;
  &:before {
    content: '';
    position: absolute;
    top: ${(upper - h) / (upper - lower) * 100}%;
    height: ${(h-l)/(upper - lower)*100}%;
    width: 1px;
    background-color: ${c > o ? 'red' : 'green'};
    transform: translateX(-50%);
    left: 50%;
  }
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    top: ${(upper - (c>o?c:o)) / (upper - lower) * 100}%;
    height: ${(Math.abs(c-o) / (upper - lower)) * 100}%;
    width: 100%;
    background-color: ${c > o ? 'red' : 'green'};
  }
  .ma5 {
    position: absolute;
    left: 0;
    width: 100%;
    height: 1px;
    border-top: 2px dotted lightblue;
    z-index: 1;
  }
`);
