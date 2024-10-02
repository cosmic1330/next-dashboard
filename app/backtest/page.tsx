'use client';

import { CssBaseline } from '@mui/material';
import Content from './(components)/Content';
import Header from './(components)/Header';
import SideBar from './(components)/SideBar';
import { Main } from './styles';
import { StatusContextProvider } from './(context)/status';

export default function Page() {
  return (
    <StatusContextProvider>
      <Main>
        <CssBaseline />
        <Header />
        <SideBar />
        <Content />
      </Main>
    </StatusContextProvider>
  );
}
