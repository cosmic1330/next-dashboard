'use client';
import { useSelectPlan } from '@/store/zustand';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Fab, Grid, Container as MuiContainer, styled } from '@mui/material';
import { useRef } from 'react';
import BackSupportLineTable from './BackSupportLineTable';
import BreakthroughPressureTable from './BreakthroughPressureTable';
import ExperimentTable from './ExperimentTable';
import GeneralizedPlansTable from './GeneralizedPlansTable';
import GoldPlatedSilverTable from './GoldPlatedSilverTable';
import HeldSupportLineTable from './HeldSupportLineTable';
import MutiConditionTable from './MutiConditionTable';
import Range from './range';
import SteadyGradualRiseTable from './SteadyGradualRiseTable';
import Switch from './switch';
import TaiexBox from './TaiexBox';
import TrackingTable from './TrackingTable';
import TwoRedSoldierTable from './TwoRedSoldierTable';
import UptrendContinuationTable from './UptrendContinuationTable';
import V1PlansTable from './V1PlansTable';
import WilliamsNegativeTrendTable from './WilliamsNegativeTrendTable';

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
    <StyledContainer ref={ref} maxWidth="xl">
      <Grid container spacing={1} mb={3}>
        <Grid item xs={4}>
          <TaiexBox />
        </Grid>
        <Grid item xs={4}>
          <Range />
          <Switch />
        </Grid>
        <Grid item xs={4}></Grid>
      </Grid>
      {plan === 1 && <TwoRedSoldierTable />}
      {plan === 2 && <BackSupportLineTable />}
      {plan === 3 && <BreakthroughPressureTable />}
      {plan === 4 && <SteadyGradualRiseTable />}
      {plan === 5 && <GoldPlatedSilverTable />}

      {plan === 101 && <GeneralizedPlansTable />}
      {plan === 102 && <UptrendContinuationTable />}
      {plan === 103 && <HeldSupportLineTable />}
      {plan === 104 && <WilliamsNegativeTrendTable />}

      {plan === 201 && <V1PlansTable />}
      {plan === 202 && <ExperimentTable />}
      {plan === 203 && <MutiConditionTable />}

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
