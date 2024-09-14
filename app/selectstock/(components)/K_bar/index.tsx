import { Bar, BarProps } from './styles';

export default function KBar({ l, h, o, c, upper, lower, ma5 }: BarProps) {
  return (
    <Bar {...{ l, h, o, c, upper, lower, ma5 }}>
      {ma5 && ma5 < upper && ma5 > lower && (
        <div
          className="ma5"
          style={{ top: `${((upper - ma5) / (upper - lower)) * 100}%` }}
        />
      )}
    </Bar>
  );
}
