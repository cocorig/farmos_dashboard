"use client";

import Table from "@/components/table";
import { useMonthlyPower } from "@/hook/usePowerData";

export default function MonthEngSection() {
  const { data } = useMonthlyPower();

  return <Table data={data} />;
}
