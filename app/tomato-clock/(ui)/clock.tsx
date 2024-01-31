import { useMemo } from 'react';
import 'animate.css';
import { styled } from '@mui/system';
import useClocks from '../(hooks)/useClocks';

const Clock = styled('div')`
  @keyframes light {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 0;
    }
    51% {
      opacity: 1;
    }
    100% {
      opacity: 1;
    }
  }
  width: 100%;
  height: 100%;
  position: relative;
  .clock-top {
    width: 5%;
    height: 25%;
    position: absolute;
    border-radius: 0 50% 50% 0%;
    background: #b18686;
    left: 50%;
    transform: rotate(25deg) translateY(-120%);
    &::before {
      content: '';
      display: inline-block;
      position: absolute;
      width: 80%;
      height: 100%;
      top: 0;
      left: 0;
      background: #b18686;
      border-radius: 0% 0% 50% 50%/10% 10% 100% 100%;
      transform: translateX(-420%) translateY(30%) rotateZ(120deg);
    }
    &::after {
      content: '';
      display: inline-block;
      position: absolute;
      width: 80%;
      height: 100%;
      top: 0;
      left: 0;
      background: #b18686;
      border-radius: 0% 0% 50% 50%/10% 10% 100% 100%;
      transform: translateX(300%) translateY(5%) rotateZ(40deg);
    }
  }
  .clock-body {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: #f99494;
    position: relative;
    overflow: hidden;
    &::before {
      content: '';
      display: inline-block;
      background-color: #fee7e7;
      width: 50%;
      height: 50%;
      transform: skewY(150deg) rotate(10deg);
      position: absolute;
      filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.5));
    }
    &::after {
      content: '';
      display: inline-block;
      position: absolute;
      width: 80%;
      height: 80%;
      border-radius: 50%;
      background: #e96d6d;
      left: 50%;
      top: 50%;
      transform: translateX(-50%) translateY(-50%);
    }
    .inner {
      display: inline-block;
      width: 16px;
      height: 16px;
      position: absolute;
      background: #9a9a9a;
      border-radius: 50%;
      left: 50%;
      top: 50%;
      transform: translateX(-50%) translateY(-50%);
      z-index: 2;
    }
    .long-needle {
      position: absolute;
      width: 3%;
      height: 40%;
      left: calc(50% - 1.5%);
      top: 10%;
      border-radius: 15px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
      z-index: 1;
      transform-origin: bottom;
      background: #ff6066;
    }
    .short-needle {
      background: #fff;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
      z-index: 1;
      transform-origin: bottom;
      position: absolute;
      width: 3%;
      height: 25%;
      left: calc(50% - 1.5%);
      top: 25%;
      border-radius: 15px;
    }
    .second-needle {
      background: #aaf;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
      z-index: 1;
      transform-origin: bottom;
      position: absolute;
      width: 2%;
      height: 40%;
      left: calc(50% - 1%);
      top: 10%;
      border-radius: 15px;
    }
  }
`;
export default function AppleClock({ date }: { date: Date }) {
  const { hoursDeg, minuteDeg, secondDeg } = useMemo(() => {
    let hours = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();

    let hoursDeg = (hours / 24) * 720 + (minute / 60) * 30;
    let minuteDeg = (minute / 60) * 360;
    let secondDeg = (second / 60) * 360;
    return {
      hoursDeg,
      minuteDeg,
      secondDeg,
    };
  }, [date]);

  return (
    <Clock className={`animate__animated animate__rubberBand`}>
      <div className="clock-top"></div>
      <div className="clock-body">
        <div className="inner"></div>
        <div
          className="long-needle"
          style={{ transform: `rotate(${minuteDeg}deg)` }}
        ></div>
        <div
          className="short-needle"
          style={{ transform: `rotate(${hoursDeg}deg)` }}
        ></div>
        <div
          className="second-needle"
          style={{ transform: `rotate(${secondDeg}deg)` }}
        ></div>
      </div>
    </Clock>
  );
}
