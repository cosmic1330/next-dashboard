import { ConditionValue } from '@/store/zustand';
import { StockListType } from '@ch20026103/anysis/dist/esm/stockSkills/types';

const methodGenerator = (
  conditions: ConditionValue[],
  data: StockListType,
): boolean => {
  for (const condition of conditions) {
    const parameter = condition.parameter;
    const rollbackParameterData = data[data.length - 1 - condition.parameter_rollback];
    const rollbackValueData = data[data.length - 1 - condition.value_rollback];
    const value =
      typeof condition.value === 'number'
        ? condition.value
        : rollbackValueData[condition.value];
    if (
      rollbackParameterData[parameter] === null ||
      value === null ||
      rollbackParameterData[parameter] === undefined ||
      value === undefined
    )
      throw new Error('Rollback Data or Value is null or undefined');
    switch (condition.operator) {
      case '>':
        if (!(rollbackParameterData[parameter] > value)) return false;
        break;
      case '<':
        if (!(rollbackParameterData[parameter] < value)) return false;
        break;
      case '>=':
        if (!(rollbackParameterData[parameter] >= value)) return false;
        break;
      case '<=':
        if (!(rollbackParameterData[parameter] <= value)) return false;
        break;
      case '==':
        if (!(rollbackParameterData[parameter] === value)) return false;
        break;
      default:
        throw new Error('不支援的運算符');
    }
  }
  return true;
};

export default methodGenerator;
