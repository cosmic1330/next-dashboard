// Moving Average Trending Up 「均線往上」
export { default as isMovingAverageTrendUp } from './isMovingAverageTrendUp';
// Moving Averages in Positive Order「均線正向排列」
export { default as isMovingAveragesPositiveOrder } from './isMovingAveragesPositiveOrder';
// Sufficient Trading Volume「足夠的成交量」
export { default as isSufficientTradingVolume } from './isSufficientTradingVolume';
// Low Deviation Rate Between K-Line and Moving Average「K 棒與均線的乖離率低」
export { default as isKbarSmallDeviationFromMA } from './isKbarSmallDeviationFromMA';
// KD Golden Cross「KD 黃金交叉」√
export { default as isKDGoldenCross } from './isKDGoldenCross';
// Two Consecutive Bullish Candlesticks with Higher Lows「紅二兵底底高」√
export { default as isTwoRedSoldiersHigherLows } from './isTwoRedSoldiersHigherLows';
// Obv Averages in Positive Order「Obv正向排列」√
export { default as isObvPositiveOrder } from './isObvPositiveOrder';
// OBV Trend Higher Lows「OBV」黃金交叉 √
export { default as isObvGoldenCross } from './isObvGoldenCross';
// Bearish Engulfing「陽棒吞噬陰棒」√
export { default as isBearishEngulfing } from './isBearishEngulfing';
// MACD Golden Cross「MACD 黃金交叉」P:僅代表多方發動還要觀察後續走勢 √
export { default as isMacdGoldenCross } from './isMacdGoldenCross';
// MACD OSC Histogram Turns Positive「MACD OSC 柱狀圖轉正」√
export { default as isOscHistogramTurningPositive } from './isOscHistogramTurningPositive';
// MACD Positive with Decreasing Green Histogram 「MACD 正向且綠柱縮小」√
export { default as isMacdPositiveWithDecreasingGreenBars } from './isMacdPositiveWithDecreasingGreenBars';
// Dropped Below MA Then Recovered「跌破均線站回」√
export { default as isPriceDroppedAndRecoveredAboveMA } from './isPriceDroppedAndRecoveredAboveMA';
// Break Through the Resistance Moving Average「 突破壓力均線」
export { default as BreakResistanceAverageLine } from './isBreakResistanceAverageLine';
// Bollinger Bands Expansion After Moving Averages Convergence「開布林」√
export { default as isBBandsExpanding } from './isBBandsExpanding';
// Moving Averages Convergence「均線糾結」√
export { default as isMovingAveragesConverging } from './isMovingAveragesConverging';
// Three Consecutive Days Above 5-Day MA「連續三天站上均線」√
export { default as isThreeConsecutiveDaysAboveMovingAverage } from './isThreeConsecutiveDaysAboveMovingAverage';
// Positive Slope of Moving Average 「均線斜率正向」√
export { default as isMaSlopePositive } from './isMaSlopePositive';
// Next Day Holds Above Long Bullish Candle Midpoint「隔日未跌破長紅中點」
export { default as isNoBreakBelowBullishCandleMidpoint } from './isNoBreakBelowBullishCandleMidpoint';
// Steady Gradual Rise「小碎步上升」
export { default as isSlowStepwiseIncrease } from './isSlowStepwiseIncrease';
// Not Break Below the Moving Average「下跌未破均線」
export { default as isNotBreakBelowMovingAverage } from './isNotBreakBelowMovingAverage';
// Gold Plated Silver「金包銀」(大跌後->撐竿跳->金包銀)
export { default as isGoldPlatedSilver } from './isGoldPlatedSilver';
