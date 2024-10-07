import {
  ConditionKey,
  ConditionValue,
  useBackTest,
  useCondition,
} from '@/store/zustand';
import { StockListType } from '@ch20026103/anysis/dist/esm/stockSkills/types';
import { useCallback, useEffect } from 'react';
import methodGenerator from '../(utils)/methodGenerator';
import sellMethod from '../(utils)/sell';
import buyMethod from '../(utils)/buy';

export default function useConditionGenerator() {
  const {
    marketSentiment,
    reviewPurchaseList,
    reviewSellList,
    sell,
    buy,
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

    // sell
    if (sell && sell.length !== 0) {
      context.sellMethod = (data: StockListType) => {
        const res = {
          status: false,
          detail: 'custom_sell',
        };
        try {
          res.status = methodGenerator(sell, data);
        } catch (error) {
          res.status = false;
        }
        return res;
      };
    } else if (sell && sell.length === 0) {
      context.sellMethod = sellMethod;
    }

    // buy
    if (buy && buy.length !== 0) {
      context.buyMethod = (data: StockListType) => {
        const res = {
          status: false,
          detail: 'custom_buy',
        };
        try {
          res.status = methodGenerator(buy, data);
        } catch (error) {
          res.status = false;
        }
        return res;
      };
    } else if (buy && buy.length === 0) {
      context.buyMethod = buyMethod;
    }
    
    // marketSentiment
    if (
      marketSentiment &&
      marketSentiment.length !== 0 
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
    } else if (marketSentiment && marketSentiment.length === 0) {
      context.marketSentiment = undefined;
    }
    // reviewPurchaseList
    if (
      reviewPurchaseList &&
      reviewPurchaseList.length !== 0 
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
    } else if (reviewPurchaseList && reviewPurchaseList.length === 0) {
      context.reviewPurchaseListMethod = undefined;
    }
    // reviewSellList
    if (
      reviewSellList &&
      reviewSellList.length !== 0 
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
  }, [buy, context, marketSentiment, reviewPurchaseList, reviewSellList, sell]);

  return { handleConditionValue };
}
