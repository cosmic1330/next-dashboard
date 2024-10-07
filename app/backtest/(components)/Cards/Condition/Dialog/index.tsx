import { useCondition } from '@/store/zustand';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Tab,
  Tabs,
} from '@mui/material';
import { ReactNode, SyntheticEvent, useState } from 'react';
import MarketSentiment from './marketSentiment';
import { default as ReviewPurchaseList } from './reviewPurchaseList';
import ReviewSellList from './reviewSellList';

interface TabPanelProps {
  children: ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Box hidden={value !== index} {...other}>
      {value === index && children}
    </Box>
  );
}

export default function ConditionDialog() {
  const { dialogStatus, setDialogStatus } = useCondition();
  const [value, setValue] = useState(0);
  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleClose = () => {
    setDialogStatus(false);
  };

  return (
    <Dialog open={dialogStatus} onClose={handleClose} maxWidth={'xl'}>
      <Box>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons
        >
          <Tab label="Market Sentiment" />
          <Tab label="Review Purchase List" />
          <Tab label="review Sell List" />
        </Tabs>
      </Box>
      <DialogContent>
        <CustomTabPanel value={value} index={0}>
          <MarketSentiment />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <ReviewPurchaseList />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <ReviewSellList />
        </CustomTabPanel>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
