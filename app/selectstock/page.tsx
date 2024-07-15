import { Paper, Stack } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { ToastContainer } from 'react-toastify';
import Container from './(components)/Container';
import SideBar from './(components)/SideBar';
import theme from './(components)/Theme/theme';
import { SelectStockContextProvider } from './(context)/selectStockContext';
import 'react-toastify/dist/ReactToastify.css';

export default function Page() {
  return (
    <ThemeProvider theme={theme}>
      <Paper>
      <SelectStockContextProvider>
        <Stack direction="row">
          <SideBar />
          <Container />
        </Stack>
      </SelectStockContextProvider>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      </Paper>
    </ThemeProvider>
  );
}
