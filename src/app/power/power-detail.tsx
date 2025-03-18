"use client";

import { Suspense } from "react";
import CustomLineChart from "@/components/line-chart";
import { useDailyPower } from "@/hook/usePowerData";

export default function PowerDetailSection({
  month,
  dgname,
}: {
  month: string;
  dgname: string;
}) {
  const { data, isLoading, isError } = useDailyPower(month ?? "", dgname ?? "");

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;

  const filteredData = data
    .filter((item) => item.data_value !== null)
    .map((item) => ({
      ...item,
      obsday: item.obsday.split("-").slice(1).join("/"),
    }));

  return (
    <>
      <Suspense fallback={<div>Loading Chart...</div>}>
        <CustomLineChart
          data={filteredData}
          xKey="obsday"
          yKey="data_value"
          xLabel="날짜"
          lineName="전력량"
        />
      </Suspense>
    </>
  );
}
