import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type ChartProps = {
  data: unknown[];
  xKey: string;
  yKey: string;
  xLabel?: string;
  yLabel?: string;
  lineName?: string;
  unit?: string;
};

export default function CustomLineChart({
  data,
  xKey,
  yKey,
  xLabel,
  yLabel,
  lineName = "value",
  unit,
}: ChartProps) {
  return (
    <div
      style={{ backgroundColor: "white", padding: "1rem", minWidth: "550px" }}
    >
      <ResponsiveContainer width="100%" maxHeight={500} aspect={4.0 / 3.0}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey={xKey}
            tickFormatter={(tick) => {
              if (xKey.includes("time")) {
                const date = new Date(tick);
                return date.toTimeString().slice(0, 5);
              }
              return tick;
            }}
            label={{
              dx: -10,
              dy: 20,
              value: xLabel || "",
              position: "insideLeft",
              offset: -8,
            }}
          />
          <YAxis
            label={{
              value: yLabel || unit || "",
              angle: 360,
              position: "insideLeft",
              dy: -210,
            }}
          />

          <Tooltip />
          <Legend />

          <Line
            type="monotone"
            dataKey={yKey}
            name={lineName ?? yKey}
            stroke="#4138ff"
            dot={false}
            activeDot={{ r: 8, stroke: "rgb(74, 65, 255)", strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
