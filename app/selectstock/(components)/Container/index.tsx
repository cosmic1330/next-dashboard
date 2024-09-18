'use client';
import { useSelectPlan } from '@/store/zustand';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Fab, Grid, Container as MuiContainer, styled } from '@mui/material';
import { useRef } from 'react';
import ExperimentTable from './ExperimentTable';
import GeneralizedPlansTable from './GeneralizedPlansTable';
import MutiConditionTable from './MutiConditionTable';
import Range from './range';
import SaraPlansTable from './SaraPlansTable';
import Switch from './switch';
import TaiexBox from './TaiexBox';
import TrackingTable from './TrackingTable';
import V1PlansTable from './V1PlansTable';
import V2PlansTable from './V2PlansTable';
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
      {plan === 1 && <GeneralizedPlansTable />}
      {plan === 2 && <V1PlansTable />}
      {plan === 3 && <V2PlansTable />}
      {plan === 4 && <SaraPlansTable />}

      {plan === 101 && <WilliamsNegativeTrendTable />}

      {plan === 201 && <ExperimentTable />}
      {plan === 202 && <MutiConditionTable />}

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
