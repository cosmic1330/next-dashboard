'use client';
import { useSelectPlan } from '@/store/zustand';
import { Grid, Container as MuiContainer, styled } from '@mui/material';
import BackSupportLineTable from './BackSupportLineTable';
import BreakthroughPressureTable from './BreakthroughPressureTable';
import CacheTable from './CacheTable';
import ForwardTable from './ForwardTable';
import KdBottomFlipTable from './KdBottomFlipTable';
import TaiexBox from './TaiexBox';
import TrackingTable from './TrackingTable';
import TwoRedSoldierTable from './TwoRedSoldierTable';
import Range from './range';
import Switch from './switch';

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
          <Switch />
        </Grid>
      </Grid>
      {plan === 0 && <CacheTable />}
      {plan === 1 && <TwoRedSoldierTable />}
      {plan === 2 && <ForwardTable />}
      {plan === 3 && <BreakthroughPressureTable />}
      {plan === 4 && <KdBottomFlipTable />}
      {plan === 5 && <BackSupportLineTable />}
      {plan === 6 && <TrackingTable />}
    </StyledContainer>
  );
}
