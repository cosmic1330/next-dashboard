import { Content as StyleContent } from '../../styles';
import Control from '../Cards/Control';
import Setting from '../Cards/Setting';
import Stocks from '../Cards/Stocks';
export default function Content() {
  return (
    <StyleContent>
      <Setting />
      <Stocks />
      <Control />
    </StyleContent>
  );
}
