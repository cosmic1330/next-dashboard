import { Content as StyleContent } from '../../styles';
import Action from '../Cards/Action';
import CaptionLineChart from '../Cards/CaptionLineChart';
import Condition from '../Cards/Condition';
import DataStatus from '../Cards/DataStatus';
import Date from '../Cards/Date';
import Detail from '../Cards/Detai';
import History from '../Cards/History';
import Inventory from '../Cards/Inventory';
import Options from '../Cards/Options';
import ProfitLineChart from '../Cards/ProfitLineChart';
import UnsoldprofitLineChart from '../Cards/UnsoldprofitLineChart';
export default function Content() {
  return (
    <StyleContent>
      <Date />
      <DataStatus />
      <Action />
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
