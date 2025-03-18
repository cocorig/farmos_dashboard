import { Suspense } from "react";

import style from "./page.module.css";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getDevices } from "@/lib/getDevices";
import { queryKeys } from "@/react-query/constants";
import DeviceList from "./devices/deviceList";
import MonthEngSection from "./power/monthSection";
import { getMonthlyPower } from "@/lib/getMonthlyPower";
import DescSection from "@/components/descSection";

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [queryKeys.devices, 1],
    queryFn: () => getDevices(1, 4),
  });

  await queryClient.prefetchQuery({
    queryKey: [queryKeys.monthlyPower],
    queryFn: getMonthlyPower,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <>
      <DescSection
        title="OverView"
        desc="현재 운영 중인 장비와 전력 사용 데이터를 제공합니다."
      />
      <div className={style.overviewSection}>
        <HydrationBoundary state={dehydratedState}>
          <div>
            <h2 className={`${style.title} font-xl`}>Device Data</h2>
            <Suspense fallback={<p>Loading device data...</p>}>
              <DeviceList />
            </Suspense>
          </div>
          <div>
            <h2 className={`${style.title} font-xl`}>Power Usage Data</h2>
            <Suspense fallback={<p>Loading power usage data...</p>}>
              <MonthEngSection />
            </Suspense>
          </div>
        </HydrationBoundary>
      </div>
    </>
  );
}
