'use client';
import { useSelectPlan } from '@/store/zustand';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Fab, Grid, Container as MuiContainer, styled } from '@mui/material';
import { useRef } from 'react';
import BackSupportLineTable from './BackSupportLineTable';
import BreakthroughPressureTable from './BreakthroughPressureTable';
import CacheTable from './CacheTable';
import ForwardTable from './ForwardTable';
import KdDivergenceTable from './KdDivergenceTable';
import KdGoldenCrossTable from './KdGoldenCrossTable';
import ObvLongTable from './ObvLongTable';
import OpenBollingTable from './OpenBollingTable';
import TaiexBox from './TaiexBox';
import TrackingTable from './TrackingTable';
import TwoRedSoldierTable from './TwoRedSoldierTable';
import WideRangingTable from './WideRanging';
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
  const ref = useRef(null);
  const { plan } = useSelectPlan();
  const scrollTop = () => {
    (ref.current as any)?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <StyledContainer ref={ref}>
      <Grid container spacing={3} mb={3}>
        <Grid item xs={6}>
          <TaiexBox />
        </Grid>
        <Grid item xs={6}>
          <Range />
          <Switch />
        </Grid>
      </Grid>
      {plan === 1 && <CacheTable />}
      {plan === 2 && <TwoRedSoldierTable />}
      {plan === 3 && <ForwardTable />}
      {plan === 4 && <BreakthroughPressureTable />}
      {plan === 5 && <KdGoldenCrossTable />}
      {plan === 6 && <BackSupportLineTable />}
      {plan === 7 && <OpenBollingTable />}

      {plan === 101 && <KdDivergenceTable />}

      {plan === 201 && <ObvLongTable />}
      {plan === 202 && <WideRangingTable />}

      {plan === 301 && <TrackingTable />}
      <Fab
        color="info"
        size="medium"
        onClick={scrollTop}
        sx={{ position: 'fixed', right: '28px', bottom: '28px' }}
      >
        <KeyboardArrowUpIcon />
      </Fab>
    </StyledContainer>
  );
}
