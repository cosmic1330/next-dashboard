import { PaletteOptions } from '@mui/material';
import { grey, red } from '@mui/material/colors';

const lightPalette: PaletteOptions = {
  mode: 'light',
  primary: {
    main: '#4cb5f5',
  },
  secondary: {
    main: '#60a6da',
  },
  error: {
    main: red.A400,
  },
};

const darkPalette: PaletteOptions = {
  mode: 'dark',
  primary: {
    main: '#999',
  },
};
export { darkPalette, lightPalette };
