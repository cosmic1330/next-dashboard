'use client';
import { useSelectPlan } from '@/store/zustand';
import { Grid, Container as MuiContainer, styled } from '@mui/material';
import CacheTable from './CacheTable';
import ForwardTable from './ForwardTable';
import PythonTable from './PythonTable';
import TaiexBox from './TaiexBox';
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
      <Grid container spacing={3} mb={3}>
        <Grid item xs={6}>
          <TaiexBox />
        </Grid>
        <Grid item xs={6}>
          <Range />
        </Grid>
      </Grid>
      {plan === 0 && <CacheTable />}
      {plan === 1 && <PythonTable />}
      {plan === 2 && <ForwardTable />}
      {plan === 3 && <TrackingTable />}
    </StyledContainer>
  );
}
