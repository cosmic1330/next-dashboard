import { Content as StyleContent } from '../../styles';
import CaptionLineChart from '../Cards/CaptionLineChart';
import Control from '../Cards/Control';
import DataStatus from '../Cards/DataStatus';
import Detail from '../Cards/Detai';
import Inventory from '../Cards/Inventory';
import Options from '../Cards/Options';
import History from '../Cards/History';
import Condition from '../Cards/Condition';
import ProfitLineChart from '../Cards/ProfitLineChart';
import Date from '../Cards/Date';
import UnsoldprofitLineChart from '../Cards/UnsoldprofitLineChart';
export default function Content() {
  return (
    <StyleContent>
      <Date />
      <DataStatus />
      <Control />
      <Detail />
      <CaptionLineChart />
      <ProfitLineChart />
      <UnsoldprofitLineChart />
      <Options />
      <Condition />
      <Inventory />
      <History />
    </StyleContent>
  );
}
