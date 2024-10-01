'use client';

import { CssBaseline } from '@mui/material';
import Content from './(components)/Content';
import Header from './(components)/Header';
import SideBar from './(components)/SideBar';
import { Main } from './styles';

export default function Page() {
  return (
    <Main>
      <CssBaseline />
      <Header />
      <SideBar />
      <Content />
    </Main>
  );
}
