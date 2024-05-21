import { Box, Typography } from '@mui/material';
import useQueryTaiex from './(hooks)/useQueryTaiex';

export default function TaiexBox() {
  const { taiexData } = useQueryTaiex();
  return (
    <Box>
      <Typography variant="h6">加權指數</Typography>
      <Box>
        <Typography component="span" variant="subtitle2">
          日期:
        </Typography>
        <Typography component="span" variant="body2">
          {taiexData && taiexData[taiexData.length - 1].t}
        </Typography>
      </Box>
      <Box>
        <Typography component="span" variant="subtitle2">
          月線方向:
        </Typography>

        {taiexData &&
        taiexData[taiexData.length - 1].ma20 >
          taiexData[taiexData.length - 2].ma20 &&
        taiexData[taiexData.length - 2].ma20 >
          taiexData[taiexData.length - 3].ma20 ? (
          <Typography variant="body2" component="span" color="success.main">
            向上
          </Typography>
        ) : taiexData &&
          taiexData[taiexData.length - 1].ma20 <
            taiexData[taiexData.length - 2].ma20 &&
          taiexData[taiexData.length - 2].ma20 <
            taiexData[taiexData.length - 3].ma20 ? (
          <Typography variant="body2" component="span" color="error">
            向下
          </Typography>
        ) : (
          <Typography variant="body2" component="span">
            盤整
          </Typography>
        )}

        <Typography variant="body2" component="span" color="success.main">
          {taiexData &&
            taiexData[taiexData.length - 1].c >
              taiexData[taiexData.length - 1].ma5 &&
            '5Ma支撐上'}
        </Typography>
        <Typography variant="subtitle2">
          {`大盤扣抵值:${
            taiexData && taiexData[taiexData.length - 1].exclusionValueMa5.d
          }`}
        </Typography>
      </Box>
      <Box>
        <Typography component="span" variant="subtitle2">
          KD趨勢:
        </Typography>
        {taiexData &&
        (taiexData[taiexData.length - 1].k as number) >
          (taiexData[taiexData.length - 1].d as number) &&
        (taiexData[taiexData.length - 1].k as number) >
          (taiexData[taiexData.length - 2].k as number) &&
        (taiexData[taiexData.length - 1].rsv as number) >
          (taiexData[taiexData.length - 2].rsv as number) ? (
          <Typography variant="body2" component="span" color="success.main">
            多頭
          </Typography>
        ) : taiexData &&
          (taiexData[taiexData.length - 1].k as number) <
            (taiexData[taiexData.length - 1].d as number) &&
          (taiexData[taiexData.length - 1].k as number) <
            (taiexData[taiexData.length - 2].k as number) &&
          (taiexData[taiexData.length - 1].rsv as number) <
            (taiexData[taiexData.length - 2].rsv as number) ? (
          <Typography variant="body2" component="span" color="error">
            空頭
          </Typography>
        ) : (
          <Typography variant="body2" component="span">
            趨勢不明
          </Typography>
        )}
        <Typography variant="body2" component="span" color="success.main">
          {taiexData &&
            (taiexData[taiexData.length - 1].k as number) >
              (taiexData[taiexData.length - 1].d as number) &&
            (taiexData[taiexData.length - 2].k as number) <
              (taiexData[taiexData.length - 2].d as number) &&
            'KD黃金交叉'}
        </Typography>
        <Typography variant="body2" component="span" color="error">
          {taiexData &&
            (taiexData[taiexData.length - 1].k as number) <
              (taiexData[taiexData.length - 1].d as number) &&
            (taiexData[taiexData.length - 2].k as number) >
              (taiexData[taiexData.length - 2].d as number) &&
            'KD死亡交叉'}
        </Typography>
      </Box>
      <Box>
        <Typography component="span" variant="subtitle2">
          Macd趨勢:
        </Typography>
        <Typography variant="body2" component="span" color="success.main">
          {taiexData &&
            (taiexData[taiexData.length - 1].osc as number) >
              (taiexData[taiexData.length - 2].osc as number) &&
            (taiexData[taiexData.length - 2].osc as number) >
              (taiexData[taiexData.length - 3].osc as number) &&
            (taiexData[taiexData.length - 1].macd as number) >
              (taiexData[taiexData.length - 2].macd as number) &&
            (taiexData[taiexData.length - 2].macd as number) >
              (taiexData[taiexData.length - 3].macd as number) &&
            '多方動能漸強'}
        </Typography>
        <Typography variant="body2" component="span" color="success.main">
          {taiexData &&
            (taiexData[taiexData.length - 1].osc as number) >
              (taiexData[taiexData.length - 2].osc as number) &&
            (taiexData[taiexData.length - 2].osc as number) >
              (taiexData[taiexData.length - 3].osc as number) &&
            (taiexData[taiexData.length - 1].macd as number) <
              (taiexData[taiexData.length - 2].macd as number) &&
            (taiexData[taiexData.length - 2].macd as number) <
              (taiexData[taiexData.length - 3].macd as number) &&
            '負背離(多)'}
        </Typography>
        <Typography variant="body2" component="span" color="error">
          {taiexData &&
            (taiexData[taiexData.length - 1].osc as number) <
              (taiexData[taiexData.length - 2].osc as number) &&
            (taiexData[taiexData.length - 2].osc as number) <
              (taiexData[taiexData.length - 3].osc as number) &&
            (taiexData[taiexData.length - 1].macd as number) >
              (taiexData[taiexData.length - 2].macd as number) &&
            (taiexData[taiexData.length - 2].macd as number) >
              (taiexData[taiexData.length - 3].macd as number) &&
            '正背離(空)'}
        </Typography>
        <Typography variant="body2" component="span" color="error">
          {taiexData &&
            (taiexData[taiexData.length - 1].osc as number) <
              (taiexData[taiexData.length - 2].osc as number) &&
            (taiexData[taiexData.length - 2].osc as number) <
              (taiexData[taiexData.length - 3].osc as number) &&
            (taiexData[taiexData.length - 1].macd as number) <
              (taiexData[taiexData.length - 2].macd as number) &&
            (taiexData[taiexData.length - 2].macd as number) <
              (taiexData[taiexData.length - 3].macd as number) &&
            '空方動能漸強'}
        </Typography>
      </Box>
    </Box>
  );
}
