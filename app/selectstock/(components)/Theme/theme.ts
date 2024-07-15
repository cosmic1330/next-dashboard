'use client';

import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';
import { darkPalette, lightPalette } from './palette';

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
type CustomType = {
  secound: string;
  text1: string;
  text2: string;
  text3: string;
};

declare module '@mui/material/styles' {
  interface Theme {
    custom: CustomType;
  }
  interface ThemeOptions extends DeepPartial<Theme> {}
}
// Create a theme instance.
const theme = createTheme({
  palette: darkPalette,
  custom: {
    secound: '#e6e6e6',
    text1: '#fff',
    text2: '#666666',
    text3: '#9f9f9f',
  },
});

export default theme;
