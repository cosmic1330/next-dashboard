import {
  ConditionKey,
  ConditionValue,
  useBackTest,
  useCondition,
} from '@/store/zustand';
import { StockListType } from '@ch20026103/anysis/dist/esm/stockSkills/types';
import { useCallback, useEffect } from 'react';
import methodGenerator from '../(utils)/methodGenerator';

export default function useConditionGenerator() {
  const {
    marketSentiment,
    reviewPurchaseList,
    reviewSellList,
    setConditionKeyValue,
  } = useCondition();
  const { context } = useBackTest();

  const handleConditionValue = useCallback(
    (value: ConditionValue, key: ConditionKey) => {
      setConditionKeyValue(value, key);
    },
    [setConditionKeyValue],
  );

  useEffect(() => {
    if (!context) return;
    // marketSentiment
    if (
      marketSentiment &&
      marketSentiment.length !== 0 &&
      !context?.marketSentiment
    ) {
      context.updateOptions({
        marketSentiment: (data: StockListType) => {
          try {
            const res = methodGenerator(marketSentiment, data);
            return res;
          } catch (error) {
            console.log(error);
            return false;
          }
        },
      });
    }else if (marketSentiment && marketSentiment.length === 0) {
      context.marketSentiment = undefined;
    }
    // reviewPurchaseList
    if (
      reviewPurchaseList &&
      reviewPurchaseList.length !== 0 &&
      !context?.reviewPurchaseListMethod
    ) {
      context.updateOptions({
        reviewPurchaseListMethod: (data: StockListType) => {
          try {
            const res = methodGenerator(reviewPurchaseList, data);
            return res;
          } catch (error) {
            console.log(error);
            return false;
          }
        },
      });
    }else if (reviewPurchaseList && reviewPurchaseList.length === 0) {
      context.reviewPurchaseListMethod = undefined;
    }
    // reviewSellList
    if (
      reviewSellList &&
      reviewSellList.length !== 0 &&
      !context?.reviewSellListMethod
    ) {
      context.updateOptions({
        reviewSellListMethod: (data: StockListType) => {
          try {
            const res = methodGenerator(reviewSellList, data);
            return res;
          } catch (error) {
            console.log(error);
            return false;
          }
        },
      });
    } else if (reviewSellList && reviewSellList.length === 0) {
      context.reviewSellListMethod = undefined;
    }
  }, [context, marketSentiment, reviewPurchaseList, reviewSellList]);

  return { handleConditionValue };
}
