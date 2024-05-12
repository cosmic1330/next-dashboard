'use client';
import { useSelectPlan } from '@/store/zustand';
import { Container as MuiContainer, styled } from '@mui/material';
import CacheTable from './CacheTable';
import ForwardTable from './ForwardTable';
import PythonTable from './PythonTable';
import TrackingTable from './TrackingTable';
import Range from './range';

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
      <Range />
      {plan === 0 && <CacheTable />}
      {plan === 1 && <PythonTable />}
      {plan === 2 && <ForwardTable />}
      {plan === 3 && <TrackingTable />}
    </StyledContainer>
  );
}
