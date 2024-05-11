import { Stack } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import Container from './(components)/Container';
import SideBar from './(components)/SideBar';
import theme from './(components)/theme';

export default function Page() {
  return (
    <ThemeProvider theme={theme}>
      <Stack direction="row">
        <SideBar />
        <Container />
      </Stack>
    </ThemeProvider>
  );
}
