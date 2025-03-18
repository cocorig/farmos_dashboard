import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { DeviceItemChart } from "../deviceChart";
import { queryKeys } from "@/react-query/constants";
import { getDeviceData } from "@/lib/getDeviceData";
import style from "./page.module.css";
import DescSection from "@/components/descSection";

type Props = {
  params: Promise<{ deviceName: string }>;
  searchParams: Promise<{ date: string; optionData: string }>;
};
export default async function DeviceItemPage({ params, searchParams }: Props) {
  const deviceName = decodeURIComponent((await params).deviceName);
  const optionDate = (await searchParams).date;
  const initialData = (await searchParams).optionData;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [queryKeys.devices, deviceName, optionDate, initialData],
    queryFn: () => getDeviceData(deviceName, optionDate, initialData),
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <div className={style.deviceDataSection}>
      <DescSection
        title={`${deviceName}`}
        desc={`${optionDate} 날짜 기준, ${deviceName}의 선택된 데이터 옵션(${initialData})을 분석한 결과입니다.`}
      />
      <HydrationBoundary state={dehydratedState}>
        <DeviceItemChart
          deviceName={deviceName}
          optionDate={optionDate}
          initialData={initialData}
        />
      </HydrationBoundary>
    </div>
  );
}
