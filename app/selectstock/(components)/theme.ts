'use client';

import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

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
    mode: string;
    custom: CustomType;
  }
  interface ThemeOptions extends DeepPartial<Theme> {}
}
// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#4cb5f5',
    },
    secondary: {
      main: '#60a6da',
    },
    error: {
      main: red.A400,
    },
  },
  custom: {
    secound: '#e6e6e6',
    text1: '#fff',
    text2: '#666666',
    text3: '#9f9f9f',
  },
});

export default theme;
