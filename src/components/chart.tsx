import React from "react";

import { DeviceData } from "@/model/devices";
import CustomLineChart from "./line-chart";

type Props = {
  deviceData: DeviceData[];
};

export default function Chart({ deviceData }: Props) {
  return (
    <CustomLineChart
      data={deviceData}
      xKey="obs_time"
      yKey="nvalue"
      xLabel="시간"
      yLabel={deviceData[0]?.unit}
      unit={deviceData[0]?.unit}
    />
  );
}
