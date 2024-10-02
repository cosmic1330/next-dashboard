import { Content as StyleContent } from '../../styles';
import Control from '../Cards/Control';
import DataStatus from '../Cards/DataStatus';
import Options from '../Cards/Options';
import Setting from '../Cards/Setting';
export default function Content() {
  return (
    <StyleContent>
      <Setting />
      <DataStatus />
      <Control />
      <Options />
    </StyleContent>
  );
}
