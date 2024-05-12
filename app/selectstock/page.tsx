import { Stack } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import Container from './(components)/Container';
import SideBar from './(components)/SideBar';
import theme from './(components)/theme';
import { RollbackDateContextProvider } from './(context)/rollback';

export default function Page() {
  return (
    <ThemeProvider theme={theme}>
      <RollbackDateContextProvider>
        <Stack direction="row">
          <SideBar />
          <Container />
        </Stack>
      </RollbackDateContextProvider>
    </ThemeProvider>
  );
}
