import { Content as StyleContent } from '../../styles';
import CaptionLineChart from '../Cards/CaptionLineChart';
import Control from '../Cards/Control';
import DataStatus from '../Cards/DataStatus';
import Detail from '../Cards/Detai';
import Inventory from '../Cards/Inventory';
import Options from '../Cards/Options';
import ProfitLineChart from '../Cards/ProfitLineChart';
import Setting from '../Cards/Setting';
import UnsoldprofitLineChart from '../Cards/UnsoldprofitLineChart';
export default function Content() {
  return (
    <StyleContent>
      <Setting />
      <DataStatus />
      <Control />
      <Detail />
      <CaptionLineChart />
      <ProfitLineChart />
      <UnsoldprofitLineChart />
      <Inventory />
      <Options />
    </StyleContent>
  );
}
