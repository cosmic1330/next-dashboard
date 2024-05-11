'use client';
import { useSelectPlan } from '@/store/zustand';
import { Container as MuiContainer, styled } from '@mui/material';
import CacheTable from './CacheTable';
import PythonTable from './PythonTable';

const StyledContainer = styled(MuiContainer)`
  padding: 10px 0;
  max-height: 100vh;
  overflow: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`;
export default function Container() {
  const { plan } = useSelectPlan();

  return (
    <StyledContainer>
      {plan === 0 && <CacheTable />}
      {plan === 1 && <PythonTable />}
    </StyledContainer>
  );
}
