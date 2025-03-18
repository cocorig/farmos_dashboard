"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDeviceData } from "@/hook/useDeviceData";
import Chart from "@/components/chart";
import style from "./deviceChart.module.css";
type Props = {
  deviceName: string;
  optionDate: string;
  initialData: string;
};

export function DeviceItemChart({
  deviceName,
  initialData,
  optionDate,
}: Props) {
  const router = useRouter();

  const [date, setDate] = useState(optionDate);

  const { data: deviceData, isLoading } = useDeviceData(
    deviceName,
    date,
    initialData
  );

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = event.target.value;
    setDate(newDate);
    router.push(
      `/devices/${deviceName}?date=${newDate}&optionData=${initialData}`
    );
  };

  if (isLoading) {
    return <p>로딩 중...</p>;
  }

  return (
    <div className={style.chartSection}>
      <div className={style.dataPicker}>
        <label htmlFor="date-picker" className="font-lg">
          <input
            type="date"
            id="date-picker"
            value={date}
            onChange={handleDateChange}
          />
        </label>
      </div>
      {deviceData.length === 0 ? (
        <p className="font-lg">
          {date}에 {deviceName} 데이터가 없습니다.
        </p>
      ) : (
        <Chart deviceData={deviceData} />
      )}
    </div>
  );
}
